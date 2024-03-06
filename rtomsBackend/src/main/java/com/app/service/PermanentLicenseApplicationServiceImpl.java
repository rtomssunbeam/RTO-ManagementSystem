package com.app.service;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ApplicationDoesNotExistException;
import com.app.daos.LearnerApplicationDao;
import com.app.daos.PermanentApplicationDao;
import com.app.daos.UserDao;
import com.app.dtos.ApiResponse;
import com.app.dtos.PermanentLicenseApplicationDTO;
import com.app.entities.LearnerLicenseApplication;
import com.app.entities.PermanentLicenseApplication;
import com.app.entities.User;
import com.app.enums.Status;

@Service
@Transactional
public class PermanentLicenseApplicationServiceImpl implements PermanentLicenseApplicationService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private LearnerApplicationDao learnerAppDao;
	
	@Autowired
	private PermanentApplicationDao permanentApplicationDao;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public ApiResponse addPermanentLicenseApplicaation(PermanentLicenseApplicationDTO permanentLicenseApplicationDTO) {
		Integer userId = permanentLicenseApplicationDTO.getUserId();
		User user = userDao.findById(userId).orElseThrow();

		Integer learnerApplicationId = permanentLicenseApplicationDTO.getLearnerApplicationId();
		LearnerLicenseApplication learnerLicenseApplication = learnerAppDao.findById(learnerApplicationId).orElseThrow();
		
		PermanentLicenseApplication permanentApp = mapper.map(permanentLicenseApplicationDTO, PermanentLicenseApplication.class);
		
		permanentApp.setUser(user);
		
		permanentApp.setLearnerApplication(learnerLicenseApplication);
		
		permanentApplicationDao.save(permanentApp);

		return new ApiResponse("Permanent Application submitted successfully...!");
	}

	@Override
	public ApiResponse updateStatus(@Valid Integer permanentAppId, Status status) {
		
		
		PermanentLicenseApplication permanentApp=permanentApplicationDao.findById(permanentAppId).orElseThrow(()->new ApplicationDoesNotExistException("Permanent Application does not exist"));
		permanentApp.setStatus(status);
		SimpleMailMessage mail = new SimpleMailMessage();
		if(status.equals(Status.APPROVED))
		{	
			permanentApp.setValidTime(LocalDateTime.now().plusYears(15));
			
			
			mail.setSubject("Permanent License Approved.");
			mail.setText("Dear Citizen, Your Permanent License is Approved ! "
					+ "It is valid till :"+permanentApp.getValidTime()+"you can get your E-Permanent License from this link : "
							+ "   <LINK>   ");
			mail.setTo(permanentApp.getUser().getEmail());
			
			mailSender.send(mail);
			
			return new ApiResponse("Permanent License Approved");
		}
		else if(status.equals(Status.REJECTED))
		{
			mail.setSubject("Permanent License Rejected.");
			mail.setText("Dear Citizen, Your Permanent License is Rejected ! "
					+ "please book another slot for final test; Thankyou.");
			mail.setTo(permanentApp.getUser().getEmail());
			
			mailSender.send(mail);
			
			return new ApiResponse("Permanent License Rejected");
		}
		return new ApiResponse("failed");
	}

}
