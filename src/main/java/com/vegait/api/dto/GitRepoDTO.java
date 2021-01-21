package com.vegait.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GitRepoDTO {
	
	// add git repo
	String name;
	String username;
	
	// list repos
	String location ;
	String repository_name ;

}
