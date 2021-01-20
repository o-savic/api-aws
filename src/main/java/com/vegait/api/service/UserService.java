package com.vegait.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vegait.api.domain.User;
import com.vegait.api.exception.BadRequestException;
import com.vegait.api.repo.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository ;
	
	@Autowired
	private PasswordEncoder encoder;
	
	public boolean existsByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	
	public User save(User user) {
		return userRepository.save(user);
	}
	
	public User register(User u) {
		if (existsByEmail(u.getEmail())) {
			throw new BadRequestException("User with that email already exists.");
		}
		u.setPassword(encoder.encode(u.getPassword()));
		save(u);
		return u;
	}
	

}
