package com.vegait.api.controller;

import java.io.File;
import java.io.IOException;

import org.eclipse.jgit.api.AddCommand;
import org.eclipse.jgit.api.CommitCommand;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.PullCommand;
import org.eclipse.jgit.api.PushCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.InvalidRemoteException;
import org.eclipse.jgit.api.errors.TransportException;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.transport.UsernamePasswordCredentialsProvider;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.api.dto.GitDTO;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/git")
public class GitController {
	
	@GetMapping("/repository")
	public String cloneRepository(@RequestBody GitDTO dto) throws InvalidRemoteException, TransportException, GitAPIException, IOException {
		String repository = dto.getName();
		
		File localPath = new File("C:\\Git\\ci-cd");
		Git git = Git.cloneRepository().setURI(repository)
				.setDirectory(localPath)
				.setCredentialsProvider(new UsernamePasswordCredentialsProvider("o.savic", "mkpQnhbo_mG8uo7X3udC"))
				.call();
		
		// git add
		File newFile = new File("C:\\Git\\ci-cd", "new-file.txt");
		if (newFile.createNewFile()) {
			System.out.println("File created: " + newFile.getName());
		}
		AddCommand add = git.add();
		add.addFilepattern("new-file.txt").call();

		// git commit
		CommitCommand commit = git.commit();
		commit.setMessage("Local commit to GitLab with new file created.").call();

		// git push
		PushCommand pushCommand = git.push();
		pushCommand.setTransportConfigCallback(null);
		pushCommand.setCredentialsProvider(new UsernamePasswordCredentialsProvider("o.savic", "mkpQnhbo_mG8uo7X3udC"));
		pushCommand.call();

		// git pull
		PullCommand pullCmd = git.pull();
		try {
			pullCmd.setCredentialsProvider(new UsernamePasswordCredentialsProvider("o.savic", "mkpQnhbo_mG8uo7X3udC"));
			pullCmd.call();
		} catch (GitAPIException e) {
			e.printStackTrace();
		}

		return repository;
	}


}
