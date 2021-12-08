package com.eleraning.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eleraning.backend.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long>{

}