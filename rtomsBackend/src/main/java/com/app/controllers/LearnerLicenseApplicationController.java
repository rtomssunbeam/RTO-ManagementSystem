package com.app.controllers;


import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dtos.ApiResponse;
import com.app.dtos.DocumentDTO;
import com.app.dtos.ImageRequest;
import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.entities.Document;
import com.app.entities.LearnerLicenseApplication;
import com.app.enums.Status;
import com.app.enums.TestResult;
import com.app.service.LearnerLicenseApplicationService;
import com.app.service.LearnerLicenseApplicationServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/lernerLicense")
@Slf4j
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class LearnerLicenseApplicationController {
	

	private Logger logger=LoggerFactory.getLogger(LearnerLicenseApplicationController.class);
	
	@Autowired // (required = true)
	private LearnerLicenseApplicationService lernerApplicationService;
	
	

	@PostMapping(value="/application",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> llApplicationForm(@RequestParam("userDetails") String learnerLicenseApplicationDto, 
											   @RequestParam("file1") MultipartFile file1,
											   @RequestParam("file2") MultipartFile file2,
											   @RequestParam("file3") MultipartFile file3)
	{
//		logger.info(learnerLicenseApplicationDto.toString());
		
		logger.info(file1.getOriginalFilename().toString());
		logger.info(file2.getOriginalFilename().toString());
		logger.info(file3.getOriginalFilename().toString());
		
		// Create an ArrayList of MultipartFile to hold the files
		ArrayList<MultipartFile> files = new ArrayList<>();
		files.add(file1); //profile pic
		files.add(file2);//educational doc
		files.add(file3);//address proof
		
		return ResponseEntity.status(HttpStatus.CREATED).body(lernerApplicationService.addLernerLicenseApplication(learnerLicenseApplicationDto,files));	
	}
	
	
	@PutMapping("/updateTestResult")
	public ResponseEntity<?> updateResult(@RequestParam String appId,TestResult result){
		int learningAppId=Integer.parseInt(appId);
		
		
		return ResponseEntity.status(200).body(lernerApplicationService.updateResult(learningAppId,result));
		
		
	}
	
//	 @PostMapping(value="/application")
//	    public ResponseEntity<String> handleFormWithImages(@RequestPart("imageRequest") ImageRequest imageRequest) {
//
//	        // Process the text data and images here
//	        String textData = imageRequest.getTextData();
//	        List<MultipartFile> images = imageRequest.getImages();
//
//	        System.out.println("Received text data: " + textData);
//
//	        for (MultipartFile image : images) {
//	            System.out.println("Received image: " + image.getOriginalFilename());
//	            // Process each image as needed
//	        }
//
//	        // Add your logic to handle the form data and images
//
//	        return new ResponseEntity<>("Form with images received successfully", HttpStatus.OK);
//	    }
	
//	@PostMapping(value="/application",consumes = "MediaType.multipart/form-data")
//	@PostMapping(value="/application",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
////	@Consumes()
//	public ResponseEntity<?> llApplicationForm(
//			@RequestParam("userDetails") String learnerLicenseApplicationDto,
//			@RequestParam("file1") MultipartFile file1,
//            @RequestParam("file2") MultipartFile file2,
//            @RequestParam("file3") MultipartFile file3)
////			@RequestParam Map<String,?> params)
//	{
////		Map<String, ?> userDetails = (Map<String, ?>) params.get("userDetails");
//		
//		logger.info(learnerLicenseApplicationDto.toString());
////		logger.info(files.get("files").);
////		for(MultipartFile file: files) {
//			logger.info(file1.getOriginalFilename().toString());
//			logger.info(file2.getOriginalFilename().toString());
//			logger.info(file3.getOriginalFilename().toString());
////		}
////		if(files!=null)
////			System.out.println("\nfiles received\n");
////		return ResponseEntity.status(HttpStatus.CREATED).body(lernerApplicationService.addLernerLicenseApplication(learnerLicenseApplicationDto,files));
//		return ResponseEntity.ok("Request received");
//	}
	
	
	
	
//	@PostMapping
//    public String handleFileUpload(@RequestParam("field1") String field1, 
//                                   @RequestParam("file1") MultipartFile file1,
//                                   @RequestParam("file2") MultipartFile file2
//                                   // Add more file parameters as needed
//                                  ) {
	
	
	
	
	
	
	
//	
//	@PostMapping(value="/application")
//	public ResponseEntity<?> llApplicationForm(@RequestParam String name, @RequestBody String[] file)
//	{
//		logger.info(name);
//		
////		logger.info(file.toString());
////		if(files!=null)
////			System.out.println("\nfiles received\n");
//		return null;	
//	}
}
	
	

/*
 * 
 @PostMapping(value = "/documents/upload",consumes = "multipart/form-data")
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

} 
 * 
 * 
 * 
 * {
  "firstName": "rajdeep",
  "middleName": "shankar",
  "lastName": "sutar",
  "mobileNumber": "string",
  "userId": 1,
  "postalAddressDTO": {
    "house": "string",
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "zipCode": "string"
  },
  "gender": "MALE",
  "bloodGroup": "A_POSITIVE",
  "dateOfBirth": "2000-02-13",
  "rtoOffice": "KOLHAPUR",
  "qualification": "BELOWSSC",
  "applicationTypes": [
    "MOTORCYCLE"
  ]
}*/

