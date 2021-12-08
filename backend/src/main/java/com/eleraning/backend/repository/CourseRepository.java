package com.eleraning.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eleraning.backend.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long>{

}