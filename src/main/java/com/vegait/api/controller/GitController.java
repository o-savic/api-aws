package com.vegait.api.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.PullCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.InvalidRemoteException;
import org.eclipse.jgit.api.errors.TransportException;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.api.domain.Command;
import com.vegait.api.domain.GitRepo;
import com.vegait.api.domain.User;
import com.vegait.api.dto.CommandDTO;
import com.vegait.api.dto.GitRepoDTO;
import com.vegait.api.dto.OutputDTO;
import com.vegait.api.dto.UserDTO;
import com.vegait.api.repo.CommandRepository;
import com.vegait.api.repo.GitRepoRepository;
import com.vegait.api.repo.UserRepository;
import com.vegait.api.service.GitRepoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/git")
public class GitController {

	File localPath;
	User user;
	GitRepo gitRepo;
	Command command;
	OutputDTO outputDTO;

	@Autowired
	GitRepoRepository gitRepoRepository;

	@Autowired
	CommandRepository commandRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	GitRepoService service;

	@PostMapping("/repository")
	public ResponseEntity<GitRepoDTO> cloneRepository(@RequestBody GitRepoDTO dto)
			throws InvalidRemoteException, TransportException, GitAPIException, IOException {
		String repository = dto.getRepository_name();
		String[] arrOfStr = repository.split("/", 5);
		String repo = arrOfStr[4];
		String[] repo_arr = repo.split("\\.");
		String repo_name = repo_arr[0];

		localPath = new File("C:\\Git\\" + dto.getUsername() + "\\" + repo_name);
		Git git = Git.cloneRepository().setURI(repository).setDirectory(localPath)
				.setCredentialsProvider(new UsernamePasswordCredentialsProvider("o.savic", "mkpQnhbo_mG8uo7X3udC"))
				.call();

		// git pull
		PullCommand pullCmd = git.pull();
		try {
			pullCmd.setCredentialsProvider(new UsernamePasswordCredentialsProvider("o.savic", "mkpQnhbo_mG8uo7X3udC"));
			pullCmd.call();
		} catch (GitAPIException e) {
			e.printStackTrace();
		}

		user = userRepository.findByEmail(dto.getUsername());
		gitRepo = new GitRepo(dto.getName(), dto.getRepository_name(), localPath.getPath(), dto.getCommand(), user);
		gitRepoRepository.save(gitRepo);
		CommandDTO commandDto = new CommandDTO(dto.getCommand());
		writeShellCommands(commandDto);

		return new ResponseEntity<GitRepoDTO>(dto, HttpStatus.OK);
	}

	@PostMapping("/writeShellCommands")
	public ResponseEntity<CommandDTO> writeShellCommands(@RequestBody CommandDTO dto) throws IOException {
		try (FileWriter writer = new FileWriter(localPath.getPath() + "\\script.bat")) {
			writer.append(dto.getLine() + "\n");
		}
		writeWorkspaceCommands();
		return new ResponseEntity<CommandDTO>(dto, HttpStatus.OK);
	}

	@PostMapping("/writeWorkspaceCommands")
	public ResponseEntity<Object> writeWorkspaceCommands() throws IOException {
		try (FileWriter writer = new FileWriter(localPath.getPath() + "\\scriptDir.bat")) {
			writer.append("dir");
		}
		return new ResponseEntity<Object>(HttpStatus.OK);
	}

	@PostMapping("/execute")
	public void executeWrittenShell() throws IOException {
		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.directory(localPath);
		// -- Windows --
		// Run a command
		processBuilder.command("cmd.exe", "/c", "script.bat");
		processBuilder.inheritIO();

		try {
			Process process = processBuilder.start();
			StringBuilder output = new StringBuilder();
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			String line;
			while ((line = reader.readLine()) != null) {
				output.append(line + "\n");
			}
			int exitVal = process.waitFor();
			if (exitVal == 0) {
				System.out.println("Success!");
				reader.close();
			} else {
				// abnormal...
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}

	@PostMapping("/executeDir")
	public void executeDir() throws IOException {
		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.directory(localPath);
		processBuilder.command("cmd.exe", "/c", "scriptDir.bat");
		processBuilder.inheritIO();

		// writing output to txt file
		try {
			Process process = processBuilder.redirectOutput(new File(localPath.getPath() + "\\output.txt")).start();
			StringBuilder output = new StringBuilder();
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			String line;
			while ((line = reader.readLine()) != null) {
				output.append(line + "\n");
			}
			int exitVal = process.waitFor();
			if (exitVal == 0) {
				System.out.println("Success!");
				reader.close();
			} else {
				// abnormal...
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		// reading output from txt file
		String key = "";
		FileReader file = new FileReader(localPath.getPath() + "\\output.txt");
		BufferedReader reader = new BufferedReader(file);

		String line = reader.readLine();

		while (line != null) {
			key += line;
			key += "\n";
			line = reader.readLine();
		}
		outputDTO = new OutputDTO(key);
	}

	@GetMapping("/{id}/workspace")
	public ResponseEntity<OutputDTO> getWorkspace(@PathVariable Long id) throws IOException {
		gitRepo = gitRepoRepository.findByRepoId(id);
		localPath = new File(gitRepo.getLocation());
		executeDir();
		return new ResponseEntity<OutputDTO>(outputDTO, HttpStatus.OK);
	}

	@GetMapping("/repositories")
	public ResponseEntity<List<GitRepo>> getAllUserRepos() throws IOException {
		ArrayList<GitRepo> repos = new ArrayList<GitRepo>();
		repos = (ArrayList<GitRepo>) gitRepoRepository.findReposByUser(gitRepo.getUser().getId());
		executeDir();
		return new ResponseEntity<List<GitRepo>>(repos, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<GitRepo> updateGitRepo(@PathVariable Long id, @RequestBody GitRepoDTO dto)
			throws IOException {
		gitRepo = gitRepoRepository.findByRepoId(id);
		gitRepo.setCommand(dto.getCommand());
		gitRepo.setName(dto.getName());
		gitRepoRepository.save(gitRepo);
		localPath = new File(dto.getLocation());
		CommandDTO commandDTO = new CommandDTO(dto.getCommand());
		writeShellCommands(commandDTO);
		return new ResponseEntity<GitRepo>(gitRepo, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteRepository(@PathVariable Long id) {
		service.deleteRepo(id);
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT); // code 204

	}

}
