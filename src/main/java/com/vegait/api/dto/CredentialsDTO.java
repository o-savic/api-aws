package com.vegait.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CredentialsDTO {
	
	private Long id ;
	private String username ;
	private String password ;
	private String description;

}
