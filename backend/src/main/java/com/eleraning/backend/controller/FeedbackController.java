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
import com.eleraning.backend.model.Feedback;
import com.eleraning.backend.model.User;
import com.eleraning.backend.repository.FeedbackRepository;
import com.eleraning.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class FeedbackController {
	
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/feedbacks")
	public List<Feedback> getAllFeedbacks(){
		return feedbackRepository.findAll();
	}
	
	@PostMapping("/feedbacks/{userId}")
	public Feedback createFeedback(@PathVariable (value = "userId") Long userId, @RequestBody Feedback feedback) {
		return userRepository.findById(userId).map(user -> {
			feedback.setUser(user);
			return feedbackRepository.save(feedback);
		}).orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + userId));
	}
	
	@PutMapping("/feedbacks/{id}/{userId}")
	public ResponseEntity<Feedback> updateFeedback(@PathVariable (value = "id") Long id, @PathVariable (value = "userId") Long userId, @RequestBody Feedback feedbackDetails){
		if(!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not exist with id: " + userId);
        }
		Feedback feedback = feedbackRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Feedback not exist with id: "+id));
		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + userId));
		feedback.setFeedback(feedbackDetails.getFeedback());
		feedback.setUser(user);
		Feedback updatedFeedback = feedbackRepository.save(feedback);
		return ResponseEntity.ok(updatedFeedback); 
	}
	
	@DeleteMapping("/feedbacks/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteFeedback(@PathVariable Long id){
		Feedback feedback = feedbackRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Feedback not exist with id: "+id));
		feedbackRepository.delete(feedback);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response); 
	}

}
