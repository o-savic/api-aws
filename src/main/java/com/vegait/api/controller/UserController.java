package com.vegait.api.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.api.domain.User;
import com.vegait.api.dto.UserDTO;
import com.vegait.api.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping
	public ResponseEntity<UserDTO> register(@RequestBody UserDTO dto) {
		User user = userService.register(
				new User(dto.getFirstName(), dto.getFirstName(), dto.getEmail(), dto.getUsername(), dto.getPassword()));
		UserDTO createdUserDTO = modelMapper.map(user, UserDTO.class);
		return new ResponseEntity<UserDTO>(createdUserDTO, HttpStatus.CREATED); // code 201
	}

}
