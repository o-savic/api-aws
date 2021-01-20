package com.vegait.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id ;
	
	@Column(name = "first_name", nullable = false) 
	private String firstName ;
	
	@Column(name = "last_name", nullable = false) 
	private String lastName ; 
	
	@NotBlank
	@Size(max = 50)
	@Email
	private String email ;
	
	@NotBlank
	@Column(name = "username")
	private String username ;
	
	@NotBlank
	@Size(max = 100)
	private String password ;

	public User(String firstName, String lastName, @NotBlank @Size(max = 50) @Email String email,
			@NotBlank String username, @NotBlank @Size(max = 100) String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
	}
	
	
	
	
}
