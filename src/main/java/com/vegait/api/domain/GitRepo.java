package com.vegait.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GitRepo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String repository_name ;
	
	@Column
	private String location;
	
	@Column
	String command ;
	
	@Column
	String name ;
	
	@OneToOne(fetch = FetchType.EAGER)
	private User user;
	
	Boolean deleted = false ;

	public GitRepo(String name, String repository_name, String location, String command, User user) {
		super();
		this.name = name;
		this.repository_name = repository_name;
		this.location = location;
		this.command = command;
		this.user = user;
	}
	
	

}
