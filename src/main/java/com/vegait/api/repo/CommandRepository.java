package com.vegait.api.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vegait.api.domain.Command;

public interface CommandRepository extends JpaRepository<Command, Long>{

}
