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
import com.eleraning.backend.model.Contact;
import com.eleraning.backend.model.User;
import com.eleraning.backend.repository.ContactRepository;
import com.eleraning.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ContactController {

	@Autowired
	private ContactRepository contactRepository;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/contacts")
	public List<Contact> getAllContacts() {
		return contactRepository.findAll();
	}

	@PostMapping("/contacts/{userId}")
	public Contact createContact(@PathVariable (value = "userId") Long userId, @RequestBody Contact contact) {
		return userRepository.findById(userId).map(user -> {
			contact.setUser(user);
			return contactRepository.save(contact);
		}).orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + userId));
	}

	@PutMapping("/contacts/{id}/{userId}")
	public ResponseEntity<Contact> updateContact(@PathVariable (value = "id") Long id, @PathVariable (value = "userId") Long userId, @RequestBody Contact contactDetails) {
		if(!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not exist with id: " + userId);
        }
		Contact contact = contactRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contact not exist with id: " + id));
		User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not exist with id: " + userId));
		contact.setUser(user);
		contact.setMessage(contactDetails.getMessage());
		Contact updatedContact = contactRepository.save(contact);
		return ResponseEntity.ok(updatedContact);
	}

	@DeleteMapping("/contacts/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteContact(@PathVariable Long id) {
		Contact contact = contactRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Contact not exist with id: " + id));
		contactRepository.delete(contact);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
