package com.eleraning.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eleraning.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	List<User> findByNameContaining(String name);
}