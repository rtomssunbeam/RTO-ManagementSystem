package com.app.controllers;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dtos.EmailRequestDTO;
import com.app.dtos.EmailResponseDTO;
import com.app.dtos.VerifyOTPRequestDTO;
import com.app.dtos.VerifyOTPResponseDTO;
import com.app.service.EmailSenderService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/emailService")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class EmailSenderServiceController {
	
	@Autowired
    private EmailSenderService emailSenderService;
	
	String storedOtp;
	
	private Logger logger= LoggerFactory.getLogger(EmailSenderServiceController.class);
    
//    public EmailSenderServiceController(EmailSenderService emailSenderService) {
//        this.emailSenderService = emailSenderService;
//    }

    @PostMapping("/send-otp")
    public ResponseEntity<EmailResponseDTO> sendOTP(@RequestBody @Valid EmailRequestDTO emailRequest) {
        String email = emailRequest.getEmail();
        
        logger.info(emailRequest.toString());

        // Generate OTP
        String otp = emailSenderService.generateOTP();

        // Store OTP in Database with the email.
        emailSenderService.storeOTPInBackend(email, otp);

        // Send OTP to the user's email
        emailSenderService.sendOTPByEmail(email, otp);

        String responseMessage = "OTP sent successfully!";
        EmailResponseDTO responseDTO = new EmailResponseDTO(email, responseMessage);

        return ResponseEntity.ok(responseDTO);
    }
    
    
    @PostMapping("/resend-otp")
    public ResponseEntity<EmailResponseDTO> resendOTP(@RequestBody EmailRequestDTO emailRequest) {
        String email = emailRequest.getEmail();

        // Generate OTP
        String otp = emailSenderService.generateOTP();

        // Store OTP in database with the email
//        emailSenderService.storeOTPInBackend(email, otp);

        // Send OTP to the user's email
        emailSenderService.sendOTPByEmail(email, otp);
        
        //Update resent OTP value in database
        emailSenderService.updateOtpByEmail(email, otp);

        String responseMessage = "OTP resent successfully!";
        EmailResponseDTO responseDTO = new EmailResponseDTO(email, responseMessage);

        return ResponseEntity.ok(responseDTO);
    }
    
    
    @PostMapping("/verify-otp")
    public ResponseEntity<VerifyOTPResponseDTO> verifyOTP(@RequestBody VerifyOTPRequestDTO request) {
        
    	String email = request.getEmail();
        String enteredOTP = request.getEnteredOTP();
        
        logger.info(request.toString());
        

        VerifyOTPResponseDTO response = emailSenderService.verifyOTP(email, enteredOTP);

        return ResponseEntity.ok(response);
    }

}