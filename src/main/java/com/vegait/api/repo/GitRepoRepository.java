package com.vegait.api.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.vegait.api.domain.GitRepo;

public interface GitRepoRepository extends JpaRepository<GitRepo, Long> {
	
	@Query(value = "SELECT * FROM git_repo AS g WHERE g.user_id = :user_id AND g.deleted = FALSE", nativeQuery = true)
	List<GitRepo> findReposByUser(Long user_id);
	
	@Query(value = "SELECT * FROM git_repo AS g WHERE g.id = :id", nativeQuery = true)
	GitRepo findByRepoId(Long id);

}
