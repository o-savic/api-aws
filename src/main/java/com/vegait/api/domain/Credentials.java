package com.vegait.api.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Credentials {
	
	@Id
	@Column(nullable = false, unique = true)
	private Long id ;
	@Column(nullable = false)
	private String username;
	private String password ;
	private String description;
	private Boolean deleted = false ;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id", referencedColumnName="id")
	private User user;

	public Credentials(Long id, String username, String password, String description) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.description = description;
	}

	public Credentials(String username, String password, String description) {
		super();
		this.username = username;
		this.password = password;
		this.description = description;
	}
	
	
	
	
	

}
