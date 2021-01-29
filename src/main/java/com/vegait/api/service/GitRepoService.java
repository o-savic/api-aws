package com.vegait.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vegait.api.domain.GitRepo;
import com.vegait.api.exception.BadRequestException;
import com.vegait.api.repo.GitRepoRepository;

@Service
public class GitRepoService {
	
	@Autowired
	GitRepoRepository repository ;
	
	public GitRepo deleteRepo(Long id) {
		GitRepo repo = repository.getOne(id);
		if (repo == null) {  
			throw new BadRequestException("Repository cannot be deleted.");
		}
		repo.setDeleted(true);
		save(repo);
		return repo;
	}
	
	public GitRepo save(GitRepo git) {
		return repository.save(git);
	}

}
