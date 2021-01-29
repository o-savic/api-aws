package com.vegait.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vegait.api.domain.Credentials;
import com.vegait.api.domain.User;
import com.vegait.api.exception.BadRequestException;
import com.vegait.api.repo.CredentialsRepository;
import com.vegait.api.repo.UserRepository;

@Service
public class CredentialsService {
	
	@Autowired
	CredentialsRepository repository ;
	
	@Autowired
	UserRepository userRepository ;
	
	@Autowired
	private PasswordEncoder encoder;
	
	public boolean existsByUsername(String username) {
		return repository.existsByUsername(username);
	}

	public Credentials save(Credentials credentials) {
		return repository.save(credentials);
	}

	public Credentials add(Credentials cred, String emailUser) {
		User user = userRepository.findByEmail(emailUser);
		if (existsByUsername(cred.getUsername())) {
			throw new BadRequestException("Credentials with that username already exist.");
		}
		cred.setPassword(encoder.encode(cred.getPassword()));
		cred.setUser(user);
		save(cred);
		return cred;
	}
	
	public List<Credentials> getAllUserCredentials(String emailUser) {
		User user = userRepository.findByEmail(emailUser);
		return repository.findUserCredentials(user.getId());
	}
	
	public Credentials editCredentials(Long id, Credentials c) {
		Credentials credentials = repository.getOne(id);
		if (credentials == null) {  
			throw new BadRequestException("Credentials cannot be changed if he is deleted or doesn't exist.");
		}
		credentials.setDescription(c.getDescription());
		credentials.setPassword(encoder.encode(c.getPassword()));
		credentials.setUsername(c.getUsername());
		save(credentials);
		return credentials;
	}
	
	public Credentials deleteCredentials(Long id) {
		Credentials credentials = repository.getOne(id);
		if (credentials == null) {  
			throw new BadRequestException("Credentials cannot be deleted.");
		}
		credentials.setDeleted(true);
		save(credentials);
		return credentials;
	}
	



}
