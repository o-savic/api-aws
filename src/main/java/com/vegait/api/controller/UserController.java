package com.vegait.api.controller;

import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vegait.api.domain.User;
import com.vegait.api.dto.UserDTO;
import com.vegait.api.service.UserService;

@CrossOrigin(origins = { "http://localhost:3000" }, maxAge = 4800, allowCredentials = "false")
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
	
	@GetMapping("/{email}")
	public ResponseEntity<UserDTO> getUser(@PathVariable String email) {
		User user = userService.findByEmail(email);
		UserDTO dto = modelMapper.map(user, UserDTO.class);
		return new ResponseEntity<UserDTO>(dto, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO dto) {
		User user = new User(dto.getFirstName(), dto.getLastName(), null, dto.getUsername(), dto.getPassword());
		User updated = userService.updateUser(id, user);
		UserDTO updatedUserDTO = modelMapper.map(updated, UserDTO.class);
		return new ResponseEntity<UserDTO>(updatedUserDTO, HttpStatus.OK);	// code 200
	}
	
	@PutMapping("/editPass/user/{id}")
	public ResponseEntity<UserDTO> editPassByUser(@PathVariable Long id, @RequestBody Map<String,String> body) {
		User user = userService.editPassByUser(id, body.get("oldPassword"), body.get("newPassword"));
		UserDTO updatedUserDTO = modelMapper.map(user, UserDTO.class);
		return new ResponseEntity<UserDTO>(updatedUserDTO, HttpStatus.OK);	// code 200

	}

}
