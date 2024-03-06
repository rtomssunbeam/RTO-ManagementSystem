package com.app.controllers;

import javax.validation.Valid;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.SigninResponse;
import com.app.dtos.ApiResponse;
import com.app.dtos.SignInDTO;
import com.app.dtos.UserDTO;
import com.app.entities.User;
import com.app.security.JwtUtils;
import com.app.service.QuestionService;
import com.app.service.UserService;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@Slf4j
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private AuthenticationManager mgr;
	
	@Autowired
	private JwtUtils utils;
	
	public UserController() {
		System.out.println("in ctor of " + getClass());
	}

	@PostMapping("/signUp")
	public ResponseEntity<?>signUp(@RequestBody UserDTO user)
	{
		Logger logger=LoggerFactory.getLogger(UserController.class);
	   	logger.info(user.toString());
		userService.addUser(user);
		ApiResponse resp=new ApiResponse();
		resp.setMsg("user added successfully");
		return ResponseEntity.status(200).body(resp);		
	}
	
	@PostMapping("/signIn")
	public ResponseEntity<?>logIn(@RequestBody SignInDTO userDto)
	{
		Authentication verifiedAuth = mgr
				.authenticate(new UsernamePasswordAuthenticationToken
						(userDto.getEmail(), userDto.getPassword()));
		
		return ResponseEntity
				.ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), "Successful Authentication!!!"));
	}
	
	@GetMapping("/getMyApplications") 
	ResponseEntity<?>getMyApplications(@RequestParam Integer userId)
	{
		return ResponseEntity.status(200).body(userService.getMyApplications(userId));
	}
	
	@GetMapping("/testQuestions")
	public ResponseEntity<?> get20RandomQuestions()
	{
		return ResponseEntity.status(200).body(questionService.get20RandomQuestions());	
	}
	
	
	

}