package com.vegait.api.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegait.api.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByEmail(String email);
	Boolean existsByEmail(String email);
}
