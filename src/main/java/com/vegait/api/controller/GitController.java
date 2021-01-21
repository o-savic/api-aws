package com.vegait.api.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.api.domain.Command;
import com.vegait.api.domain.GitRepo;
import com.vegait.api.domain.User;
import com.vegait.api.dto.CommandDTO;
import com.vegait.api.dto.GitRepoDTO;
import com.vegait.api.repo.CommandRepository;
import com.vegait.api.repo.GitRepoRepository;
import com.vegait.api.repo.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/git")
public class GitController {

	File localPath;
	User user ;
	GitRepo gitRepo ;
	Command command ;
	
	@Autowired 
	GitRepoRepository gitRepoRepository ;
	
	@Autowired
	CommandRepository commandRepository ;
	
	@Autowired
	UserRepository userRepository ;

	@PostMapping("/repository")
	public ResponseEntity<GitRepoDTO> cloneRepository(@RequestBody GitRepoDTO dto)
			throws InvalidRemoteException, TransportException, GitAPIException, IOException {
		String repository = dto.getName();
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
		gitRepo = new GitRepo(repo_name, localPath.getPath(), null, user);

		return new ResponseEntity<GitRepoDTO>(dto, HttpStatus.OK);
	}

	@PostMapping("/writeShellCommands")
	public ResponseEntity<CommandDTO> writeShellCommands(@RequestBody CommandDTO dto) throws IOException {

		try (FileWriter writer = new FileWriter(localPath.getPath() + "\\script.bat", true)) {
			writer.append(dto.getLine() + "\n");
		}

		gitRepo.setCommand(dto.getLine());
		gitRepoRepository.save(gitRepo);
		getAllUserRepos();
		return new ResponseEntity<CommandDTO>(dto, HttpStatus.OK);
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
			System.out.println(exitVal);
			if (exitVal == 0) {
				System.out.println("Success!");
				System.out.println(output);
				reader.close();
				// System.exit(0);
			} else {
				// abnormal...
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}
	
	@GetMapping("/repositories")
	public ResponseEntity<List<GitRepo>> getAllUserRepos() {
		ArrayList<GitRepo> repos = new ArrayList<GitRepo>();
		repos = (ArrayList<GitRepo>) gitRepoRepository.findReposByUser(gitRepo.getUser().getId());
		return new ResponseEntity<List<GitRepo>>(repos, HttpStatus.OK) ;
	}
	
	

}
