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
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column
	private String repository_name ;
	
	@Column
	private String location;
	
	@Column
	String command ;
	
	@OneToOne(fetch = FetchType.EAGER)
	private User user;

	public GitRepo(String repository_name, String location, String command, User user) {
		super();
		this.repository_name = repository_name;
		this.location = location;
		this.command = command;
		this.user = user;
	}
	
	

}
