package com.vegait.api.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vegait.api.domain.Credentials;

public interface CredentialsRepository extends JpaRepository<Credentials, Long> {
	
	Boolean existsByUsername(String username);
	
	@Query(value = "SELECT * FROM credentials AS c WHERE c.user_id = :user_id AND c.deleted = FALSE", nativeQuery = true)
	List<Credentials> findUserCredentials(Long user_id);

}
