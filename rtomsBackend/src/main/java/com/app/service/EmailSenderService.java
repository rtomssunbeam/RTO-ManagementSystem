package com.app.service;

import com.app.dtos.VerifyOTPResponseDTO;

public interface EmailSenderService {
	String generateOTP();
    void sendOTPByEmail(String email, String otp);
	void storeOTPInBackend(String email, String otp);
	VerifyOTPResponseDTO verifyOTP(String email, String enteredOTP);
	void updateOtpByEmail(String email, String newOtp);
	

}
