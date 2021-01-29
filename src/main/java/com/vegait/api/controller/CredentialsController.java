package com.vegait.api.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
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

import com.vegait.api.domain.Credentials;
import com.vegait.api.dto.CredentialsDTO;
import com.vegait.api.service.CredentialsService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/credentials")
public class CredentialsController {
	
	@Autowired
	CredentialsService service ;
	
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/user/{email}")
	public ResponseEntity<CredentialsDTO> addCredentials(@RequestBody CredentialsDTO dto, @PathVariable("email") String email) {
		Credentials cred = service.add(
				new Credentials(dto.getId(), dto.getUsername(), dto.getPassword(), dto.getDescription()), email);
		CredentialsDTO createdDTO = modelMapper.map(cred, CredentialsDTO.class);
		return new ResponseEntity<CredentialsDTO>(createdDTO, HttpStatus.CREATED); // code 201
	}
	
	@GetMapping("/user/{email}")
	public ResponseEntity<List<CredentialsDTO>> getAllUserCredentials(@PathVariable("email") String email) {
		List<Credentials> credList = service.getAllUserCredentials(email);
		List<CredentialsDTO> credDTOs = credList.stream().map(cred -> {
            CredentialsDTO dto = modelMapper.map(cred, CredentialsDTO.class);
            return dto;
        }).collect(Collectors.toList());

		return new ResponseEntity<List<CredentialsDTO>>(credDTOs, HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CredentialsDTO> updateCredentials(@PathVariable Long id, @RequestBody CredentialsDTO dto) {
		Credentials cred = service.editCredentials(id, new Credentials(dto.getUsername(), dto.getPassword(), dto.getDescription()));
		CredentialsDTO updatedDTO = modelMapper.map(cred, CredentialsDTO.class);
		return new ResponseEntity<CredentialsDTO>(updatedDTO, HttpStatus.OK);	// code 200
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteCredentials(@PathVariable Long id) {
		service.deleteCredentials(id);
		return new ResponseEntity<Object>(HttpStatus.NO_CONTENT); // code 204
		
	}

}
