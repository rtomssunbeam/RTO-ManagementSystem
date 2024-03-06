package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Question;
import com.app.service.QuestionService;

@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	
	@GetMapping
	public ResponseEntity<?> get20RandomQuestions()
	{
		return ResponseEntity.status(200).body(questionService.get20RandomQuestions());	
	}
	
	
}
