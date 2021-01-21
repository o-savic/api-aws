package com.vegait.api.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Command {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String line;

	public Command(String line) {
		super();
		this.line = line;
	}

}
