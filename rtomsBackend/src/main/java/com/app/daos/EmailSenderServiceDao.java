package com.app.daos;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.OTPRecord;


public interface EmailSenderServiceDao extends JpaRepository<OTPRecord, Integer> {
	
//	Optional<OTPRecord> findLatestValidOTPByEmail(String email);
//	  SELECT * FROM otp_record WHERE email = :email AND timestamp > CURRENT_TIMESTAMP ORDER BY timestamp DESC LIMIT 1
	    
//	    @Modifying
//	    @Transactional
//	    @Query(value = "DELETE FROM otprecord_tbl WHERE timestamp < CURRENT_TIMESTAMP() LIMIT 1000", nativeQuery = true)
//	    void deleteExpiredRecords();
	    @Modifying
	    @Transactional
	    @Query("DELETE FROM OTPRecord o WHERE o.timestamp < CURRENT_TIMESTAMP")
	    void deleteExpiredRecords();
	    
	    // Method to update OTP value by email
	    @Modifying
	    @Transactional
	    @Query("UPDATE OTPRecord o SET o.otp = :newOtp,o.timestamp=:newTimestamp WHERE o.email = :email")
	    void updateOtpByEmail(@Param("email") String email, @Param("newOtp") String newOtp,@Param("newTimestamp") LocalDateTime newTimestamp);

		Optional<OTPRecord> findByEmail(String email);
	    
	    

}
