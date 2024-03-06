package com.app.controllers;

import java.io.IOException;
import java.util.ArrayList;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.daos.LearnerApplicationDao;
import com.app.daos.UserDao;
import com.app.dtos.DocumentDTO;
import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.entities.Document;
import com.app.entities.LearnerLicenseApplication;
import com.app.entities.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/doc")
@CrossOrigin(origins = "http://localhost:3000")
public class DocumentController {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private LearnerApplicationDao learnerAppDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ObjectMapper objMapper;
	
	
	@PostMapping(value = "/images",consumes = "multipart/form-data")
	public void upload(@RequestBody MultipartFile[]files) 
	{
		System.out.println("image controller image recieved");
		Document document=new Document();
		try {
			document.setProfilePhoto(files[0].getBytes());
			document.setAddressProof(files[1].getBytes());
			document.setEducationalDocument(files[2].getBytes());
			System.out.println("successfully parsed");
		} catch (IOException e) {
			System.out.println("error in doc ctrller");
			e.printStackTrace();
		}
	}
	
	@PostMapping(value = "/imagesAndJson",consumes = "multipart/form-data")
	public void uploadJsonAndData(@RequestParam ArrayList<MultipartFile> file,@RequestParam String applicationData ) 
	{
		System.out.println("image controller image recieved");
//		System.out.println("name of file recieved : ");
		file.forEach(f->System.out.println(f.getOriginalFilename()));
//		System.out.println("length of image "+files.length);
//		System.out.println("data recieved"+applicationData);
		
		LearningLicenseApplicationDTO learnerLicenseApplicationDto=new LearningLicenseApplicationDTO();
		try {
			learnerLicenseApplicationDto = objMapper.readValue(applicationData, LearningLicenseApplicationDTO.class);
		} catch (JsonMappingException e) {
			
			System.out.println("json maping exception");
		} catch (JsonProcessingException e) {
			
			System.out.println("json processing exception");
		}
		
		LearnerLicenseApplication learnerLicenseApplication=mapper.map(learnerLicenseApplicationDto, LearnerLicenseApplication.class);
		
//		System.out.println("learner license application after mapping :"+learnerLicenseApplication);		
		Document document=new Document();
		try {
			document.setAddressProof(file.get(0).getBytes());
			document.setProfilePhoto(file.get(1).getBytes());
			document.setEducationalDocument(file.get(2).getBytes());
			System.out.println("successfully parsed");
		} catch (IOException e) {
			System.out.println("error in doc ctrller");
			e.printStackTrace();
		}
		
	}

//	@PostMapping(value = "/images",consumes = "multipart/form-data")
//	public void uploadImage(@)
//	{
//		
//	}
	
	
}
