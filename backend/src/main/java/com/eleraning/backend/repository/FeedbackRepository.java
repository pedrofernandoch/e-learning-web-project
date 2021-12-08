package com.eleraning.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eleraning.backend.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long>{

}