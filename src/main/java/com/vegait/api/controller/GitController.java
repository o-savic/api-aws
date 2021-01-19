package com.vegait.api.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.PullCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.InvalidRemoteException;
import org.eclipse.jgit.api.errors.TransportException;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.api.dto.CommandDTO;
import com.vegait.api.dto.GitDTO;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/git")
public class GitController {
	
	@PostMapping("/repository")
	public ResponseEntity<GitDTO> cloneRepository(@RequestBody GitDTO dto) throws InvalidRemoteException, TransportException, GitAPIException, IOException {
		String repository = dto.getName();
		System.out.println("REPOSITORY: " + repository);
		
		File localPath = new File("C:\\Git\\repository");
		Git git = Git.cloneRepository().setURI(repository)
				.setDirectory(localPath)
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

		return new ResponseEntity<GitDTO>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/writeShellCommands")
	public ResponseEntity<CommandDTO> writeShellCommands(@RequestBody CommandDTO dto) throws IOException {
		
		try (FileWriter writer = new FileWriter("C:\\Git\\repository\\script.bat", true)) {
			writer.append("\n" + dto.getLine());
		}
		
	    return new ResponseEntity<CommandDTO>(dto, HttpStatus.OK);
	}
	
	@PostMapping("/execute")
	public void executeWrittenShell() throws IOException {
		//ProcessBuilder processBuilder = new ProcessBuilder("C:\\Git\\repository\\script.bat");
	    // -- Windows --
	    // Run a command
		//File localPath = new File("C:\\Git\\repository\\");
		//processBuilder.directory(localPath);
	    //processBuilder.command("cmd.exe");
	    // Run a bat file
	    //processBuilder.command("script.bat");
	    
		Process proc = new ProcessBuilder("script.bat", "help")
		        .directory(new File("C:\\Git\\repository"))
		        .inheritIO()
		        .start();

	    try {
	        //Process process = processBuilder.start();
	        StringBuilder output = new StringBuilder();
	        BufferedReader reader = new BufferedReader(
	                new InputStreamReader(proc.getInputStream()));
	        String line;
	        while ((line = reader.readLine()) != null) {
		        System.out.println(line);
	            output.append(line + "\n");
	        }
	        int exitVal = proc.waitFor();
	        System.out.println(exitVal);
	        if (exitVal == 0) {
	            System.out.println("Success!");
	            System.out.println(output);
	            reader.close();
	            //System.exit(0);
	        } else {
	            //abnormal...
	        }

	    } catch (IOException e) {
	        e.printStackTrace();
	        System.out.println("Usao u IOException!");
	    } catch (InterruptedException e) {
	    	System.out.println("Usao u interrupted exception!");
	        e.printStackTrace();
	    }
	    
	}



}
