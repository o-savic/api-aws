package com.vegait.api.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
public class Book {
	
	@Id
	@GeneratedValue
	private long id ;
	
	@NotNull
	private String title, isbn;

}
