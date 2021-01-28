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
	private UserRepository userRepository;

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
	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User updateUser(Long id, User u) {
		User user = userRepository.getOne(id);
		if (user == null) {  
			throw new BadRequestException("User cannot be changed if he doesn't exist.");
		}
		user.setFirstName(u.getFirstName());
		user.setLastName(u.getLastName());
		user.setUsername(u.getUsername());
		save(user);
		return user;
	}
	
	public User editPassByUser(Long id, String oldPassword, String newPassword) {
		User user = userRepository.getOne(id);
		if (user == null) {
			throw new BadRequestException("User cannot be changed if he doesn't exist.");
		}
		if(!encoder.matches(oldPassword, user.getPassword())){
			throw new BadRequestException("Old password isn't correct.");
		}
		user.setPassword(encoder.encode(newPassword));
		save(user);
		return user;
	}

}
