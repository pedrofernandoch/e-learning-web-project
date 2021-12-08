package com.eleraning.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eleraning.backend.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long>{

}