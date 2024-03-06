package com.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.controllers.LearnerLicenseApplicationController;
import com.app.daos.ApplicationTypeDao;
import com.app.daos.LearnerApplicationDao;
import com.app.daos.UserDao;
import com.app.dtos.ApiResponse;
import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.dtos.PostalAddressDTO;
import com.app.entities.ApplicationType;
import com.app.entities.Document;
import com.app.entities.LearnerLicenseApplication;
import com.app.entities.PostalAddress;
import com.app.entities.User;
import com.app.enums.Status;
import com.app.enums.TestResult;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class LearnerLicenseApplicationServiceImpl implements LearnerLicenseApplicationService {

	@Autowired
	private LearnerApplicationDao learnerAppDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ApplicationTypeDao applicationTypeDao;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private ObjectMapper objMapper;
	
	@Autowired
	private JavaMailSender mailSender;

	private Logger logger = LoggerFactory.getLogger(LearnerLicenseApplicationController.class);

	@Override
	public LearningLicenseApplicationDTO addLernerLicenseApplication(String learnerApplicationString, ArrayList<MultipartFile> files)


	/*
	 * Why throws keyword ? Therefore, even though Spring Boot simplifies exception
	 * handling by converting checked exceptions to unchecked ones, it's still
	 * crucial to handle exceptions appropriately to maintain the stability,
	 * reliability, and usability of your application. You should catch and handle
	 * exceptions where they occur or propagate them to higher levels of the
	 * application where they can be handled effectively.
	 */
	{
		LearningLicenseApplicationDTO learnerApplicationDTO = null;
		Document document = null;
		PostalAddressDTO postalAddressDTO = null;
		try {
			document = new Document(files.get(0).getBytes(), files.get(1).getBytes(), files.get(2).getBytes());
			learnerApplicationDTO = objMapper.readValue(learnerApplicationString, LearningLicenseApplicationDTO.class);
		} catch (IOException e) {
			logger.info("Error While Parsing the file");
			e.printStackTrace();
		}

		Integer userId = learnerApplicationDTO.getUserId();
		logger.info(userId.toString());
		User user = userDao.findById(userId).orElseThrow();
		logger.info(user.toString());

		
		
		System.out.println(learnerApplicationDTO.getPostalAddressDTO());
		
		
		PostalAddress postalAddress = mapper.map(learnerApplicationDTO.getPostalAddressDTO(), PostalAddress.class);
		
//		System.out.println(learnerApplicationDTO);
//		System.out.println(postalAddressDTO);
//		System.out.println(postalAddress);
		
		LearnerLicenseApplication learnerApp = mapper.map(learnerApplicationDTO, LearnerLicenseApplication.class);
		System.out.println(learnerApp.getApplicationTypes());
		learnerApp.getApplicationTypes().clear();
		learnerApp.setUser(user);
		learnerApp.setMyDocument(document);
		learnerApp.setPostalAddress(postalAddress);
		

		Set<ApplicationType> applicationTypes = new HashSet<>();
		learnerApplicationDTO.getApplicationTypes()
				.forEach(s -> applicationTypes.add(applicationTypeDao.findByApplicationType(s)));


		for (ApplicationType eachType : applicationTypes) {
			System.out.println(eachType);
			learnerApp.addType(eachType);
		}
		learnerAppDao.save(learnerApp);
		return mapper.map(learnerApp, LearningLicenseApplicationDTO.class);
	}

	
	@Override
	@Transactional
	public ApiResponse updateStatus(Integer learnerAppId,Status status) {
		
		ApiResponse resp=new ApiResponse("status updatation failed");
		
		logger.info(learnerAppId.toString());
		logger.info(status.toString());
		
		LearnerLicenseApplication learnerApp =learnerAppDao.findById(learnerAppId).orElseThrow();
		
		
			if(learnerApp.getStatus().toString().equals(Status.PENDING.toString()))
			{
				if(learnerApp.getResult().equals(TestResult.PASS))
				{
					learnerApp.setStatus(status);
					
					if(status.equals(Status.APPROVED))
					{
						learnerApp.setApprovalTime(LocalDateTime.now());
						learnerApp.setValidTill(LocalDateTime.now().plusMonths(6));
						
						SimpleMailMessage mail = new SimpleMailMessage();
						mail.setSubject("Learning License Approved!");
						mail.setText("Dear citizen your Learning License has been aprooved today. Please apply for learning license within 6 month from now. Thanks and regards!"
								+ "you can download your license from above link - http://localhost:3000/GetELearningLicense ");
						mail.setTo(learnerApp.getUser().getEmail());
						mailSender.send(mail);		
					}			
					learnerAppDao.save(learnerApp);
					resp.setMsg("Learner License Status Updated for application id : "+learnerApp.getId());
				}
			}
		
		return resp;
	}


	@Override
	@Transactional
	public LearningLicenseApplicationDTO getApplication(Integer appId) {
		
		LearnerLicenseApplication learnerApp = learnerAppDao.findById(appId).orElseThrow();
		
//		logger.info(learnerApp.toString());
//		logger.info(learnerApp.getResult().toString());
		
		LearningLicenseApplicationDTO learnerAppDTO = mapper.map(learnerApp, LearningLicenseApplicationDTO.class);
		
		learnerAppDTO.setPostalAddressDTO(mapper.map(learnerApp.getPostalAddress(), PostalAddressDTO.class));
		
		
		return learnerAppDTO;
	}
	
	@Transactional
	@Scheduled(cron = "@daily")
	@Override
	public void expireLearnerApplications() {
		

		
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setSubject("EXPIARY NOTIFICATION");
		mail.setText("Dear citizen your Learning License has been expired today. Please re-apply.");
		
		List<String>expiredEmailsList=learnerAppDao.findByStatus(LocalDateTime.now());
		
		expiredEmailsList.forEach(email->{
			mail.setTo(email);
			mailSender.send(mail);
			
		});
		
		learnerAppDao.expireLearanerApplications();
		
		
	}


	@Override
	public String updateResult(int learningAppId,TestResult result) {
		String resp="";
		LearnerLicenseApplication lla=  learnerAppDao.findById(learningAppId).orElseThrow();
		lla.setResult(result);
		learnerAppDao.save(lla);
		
		if(result.toString().equals("PASS"))
		{
			resp="you have passed the Test, Once the application gets approved by admin we'll get back to you, ThankYou!";
		}
		else
		{
			resp="You have failed, apply for learning license again after 2 working days";
		}
		
		return resp;
	}
	


}
