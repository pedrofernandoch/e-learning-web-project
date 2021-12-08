package com.eleraning.backend.controller;

import java.time.LocalDate;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eleraning.backend.exception.ResourceNotFoundException;
import com.eleraning.backend.model.User;
import com.eleraning.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/users")
	public List<User> getAllUsers(@RequestParam(name = "search", required = false) String name){
		if(name == null) {
			return userRepository.findAll();
		}else {
			return userRepository.findByNameContaining(name);
		}
		
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserByName(@PathVariable Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id: "+id));
		return ResponseEntity.ok(user);
	}
	
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		user.setRegisterDate(LocalDate.now());
		return userRepository.save(user);
	}
	
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id: "+id));
		user.setName(userDetails.getName());
		user.setEmail(userDetails.getEmail());
		user.setPassword(userDetails.getPassword());
		user.setAdress(userDetails.getAdress());
		user.setPhone(userDetails.getPhone());
		user.setName(userDetails.getName());
		user.setUploadPhoto(userDetails.getUploadPhoto());
		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser); 
	}
	
	@DeleteMapping("users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
		User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id: "+id));
		userRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response); 
	}
}
