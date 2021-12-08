package com.eleraning.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eleraning.backend.exception.ResourceNotFoundException;
import com.eleraning.backend.model.Course;
import com.eleraning.backend.repository.CourseRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class CourseController {
	
	@Autowired
	private CourseRepository courseRepository;
	
	@GetMapping("/courses")
	public List<Course> getAllCourses(){
		return courseRepository.findAll();
	}
	
	@PostMapping("/courses")
	public Course createCourse(@RequestBody Course course) {
		return courseRepository.save(course);
	}
	
	@PutMapping("/courses/{id}")
	public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course courseDetails){
		Course course = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course not exist with id: "+id));
		course.setName(courseDetails.getName());
		course.setDescription(courseDetails.getDescription());
		course.setFees(courseDetails.getFees());
		course.setResource(courseDetails.getResource());
		Course updatedCourse = courseRepository.save(course);
		return ResponseEntity.ok(updatedCourse); 
	}
	
	@DeleteMapping("/courses/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCourse(@PathVariable Long id){
		Course course = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course not exist with id: "+id));
		courseRepository.delete(course);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response); 
	}
}
