package com.app.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.controllers.LearnerLicenseApplicationController;
import com.app.daos.EmailSenderServiceDao;
import com.app.dtos.VerifyOTPResponseDTO;
import com.app.entities.OTPRecord;

@Service
public class EmailSenderServiceImpl implements EmailSenderService {
	
	private static final String DIGITS = "0123456789";
    private static final int OTP_LENGTH = 4;
    
    private Logger logger = LoggerFactory.getLogger(EmailSenderServiceImpl.class);
																																																																																																																																																																																																																																																																																																																																																																																																																			    // In-memory storage				
    //private final Map<String, String> otpStorage = new HashMap<>(); // In-memory storage
  
    @Autowired
    private JavaMailSender javaMailSender;
    
    @Autowired
    private final EmailSenderServiceDao emailSenderServiceDao;
    
    @Autowired
    public EmailSenderServiceImpl(JavaMailSender javaMailSender,EmailSenderServiceDao emailSenderServiceDao) {
        this.javaMailSender = javaMailSender;
        this.emailSenderServiceDao = emailSenderServiceDao;
    }
    
    //======================= To check if entered email already exist in database ======================
    
//  @Override
//  public boolean isEmailAlreadyRegistered(String email) {
//      return userRepository.findByEmail(email) != null;
//  }
 
   //========================= To Generate and Send OTP via Email ===================================== 
    
	@Override
	public String generateOTP() {
	   
    	 Random random = new Random();// Implement OTP generation logic  using a random number generator.
         StringBuilder otp = new StringBuilder(OTP_LENGTH);// Return the generated OTP
         
         for (int i = 0; i < OTP_LENGTH; i++) {
             otp.append(DIGITS.charAt(random.nextInt(DIGITS.length())));
         }
         System.out.println(otp.toString());
         return otp.toString();
	}
    


	@Override
	public void sendOTPByEmail(String email, String otp) {
		
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);

        javaMailSender.send(message);
		
	}
	
	
    @Override
    @Transactional
//    public void storeOTPInBackend(String email, String otp) {
//       // otpStorage.put(email, otp);
//    	logger.info(email);
//    	logger.info(otp);
//    	 OTPRecord otpRecord = new OTPRecord();
//         otpRecord.setEmail(email);
//         otpRecord.setOtp(otp);
//         otpRecord.setTimestamp(LocalDateTime.now().plusMinutes(5)); // OTP validity period
//
//         emailSenderServiceDao.save(otpRecord);
//    }
    

    public void storeOTPInBackend(String email, String otp) {
        logger.info(email);
        logger.info(otp);

        // Check if a record with the given email already exists
        Optional<OTPRecord> existingRecordOptional = emailSenderServiceDao.findByEmail(email);

        if (existingRecordOptional.isPresent()) {
            // If record exists, update it
            OTPRecord existingRecord = existingRecordOptional.get();
            existingRecord.setOtp(otp);
            existingRecord.setTimestamp(LocalDateTime.now().plusMinutes(5)); // Update timestamp if needed

            emailSenderServiceDao.save(existingRecord);
        } else {
            // If record doesn't exist, insert a new record
            OTPRecord newRecord = new OTPRecord();
            newRecord.setEmail(email);
            newRecord.setOtp(otp);
            newRecord.setTimestamp(LocalDateTime.now().plusMinutes(5)); // OTP validity period

            emailSenderServiceDao.save(newRecord);
        }
    }

    
    
	 //========================= To Receive and Verify OTP Entered by user ===================================== ===
    
//	  @Override
//	    public VerifyOTPResponseDTO verifyOTP(String email, String enteredOTP) {
//	        
//		  String storedOTP = otpStorage.get(email);
//
//	        VerifyOTPResponseDTO response = new VerifyOTPResponseDTO(email, "");
//
//	        if (storedOTP != null && storedOTP.equals(enteredOTP)) {
//	            response.setMessage("OTP verification succeeded!");
//	        } else {
//	            response.setMessage("OTP verification failed!");
//	        }
//
//	        return response;
//	    }
//
//	    @Override
//	    @Transactional(readOnly = true)
//	    public boolean verifyOTP(String email, String enteredOTP) {
//	        Optional<OTPRecord> otpRecordOptional = otpRecordRepository.findLatestValidOTPByEmail(email);
//
//	        if (otpRecordOptional.isPresent()) {
//	            OTPRecord otpRecord = otpRecordOptional.get();
//
//	            if (otpRecord.getOtp().equals(enteredOTP)) {
//	                // Validate timestamp to ensure OTP is still valid
//	                return otpRecord.getTimestamp().isAfter(LocalDateTime.now());
//	            }
//	        }
//      return false;
//	  }
	
	

    @Override
    @Transactional(readOnly = true)
    public VerifyOTPResponseDTO verifyOTP(String email, String enteredOTP) {
//        Optional<OTPRecord> otpRecordOptional = emailSenderServiceDao.findLatestValidOTPByEmail(email);
        Optional<OTPRecord> otpRecordOptional = emailSenderServiceDao.findByEmail(email);
//        Optional<OTPRecord> otpRecordOptional = emailSenderServiceDao.findLatestValidOTPByEmail(email).stream().filter(e->email.equals(e.getEmail())).max(Comparator.comparing(OTPRecord::getTimestamp));

        VerifyOTPResponseDTO response = new VerifyOTPResponseDTO();
        response.setEmail(email);

      if (otpRecordOptional.isPresent()) {
            OTPRecord otpRecord = otpRecordOptional.get();

          if (otpRecord.getOtp().equals(enteredOTP)) {
               if (otpRecord.getTimestamp().isAfter(LocalDateTime.now())) {
                    response.setSuccess(true);
                    response.setMessage("OTP verification succeeded!");
                } 
          
               else {
                    response.setSuccess(false);
                    response.setMessage("OTP has expired.");	
                }
           } 
         else {
                response.setSuccess(false);
                response.setMessage("Invalid OTP entered.");
            }
        } 
      else {
            response.setSuccess(false);
            response.setMessage("No valid OTP found for this email.");
        }

        return response;
    }

	@Override
	@Transactional
	public void updateOtpByEmail(String email, String newOtp) {
		
		LocalDateTime newtimestamp= LocalDateTime.now().plusMinutes(5);
		emailSenderServiceDao.updateOtpByEmail(email, newOtp,newtimestamp);
		
	}
	

}
