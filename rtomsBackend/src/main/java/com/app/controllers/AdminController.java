package com.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.daos.LearnerApplicationDao;
import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.dtos.UserDTO;
import com.app.enums.DocumentName;
import com.app.enums.Status;
import com.app.service.AdminService;
import com.app.service.LearnerLicenseApplicationService;
import com.app.service.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://localhost:3001")
public class AdminController {

	@Autowired
	private LearnerLicenseApplicationService learnerApplicationService;
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/getUsers")
	public ResponseEntity<?>getAllUsers(@RequestParam(defaultValue = "0", required = false) int pageNumber )
	{
		return ResponseEntity.status(200).body(adminService.getAllUsersPaginated(pageNumber));
		
	}
	
	@GetMapping("/getAllLearnerApplications")
	public ResponseEntity<?>getAllLearnerApplications(@RequestParam(defaultValue = "0", required = false) int pageNumber )

	{
		return ResponseEntity.status(200).body(adminService.getAllLearnerLicensePaginated(pageNumber));

	}
	
	@GetMapping("/getAllPermanentApplications")
	public ResponseEntity<?>getAllPermanentApplications(@RequestParam(defaultValue = "0", required = false) int pageNumber )

	{
		return ResponseEntity.status(200).body(adminService.getAllPermanentLicensePaginated(pageNumber));

	}
	
	
	@GetMapping("/getLearnerApplication") //get documents of single application
	public ResponseEntity<?>getLearnerApplication(@RequestParam String applicationId)

	{
		Integer appId=Integer.valueOf(applicationId);
		return ResponseEntity.status(200).body(learnerApplicationService.getApplication(appId));

	}
	
	
	@GetMapping("/getDocuments") //get documents of single application
	public ResponseEntity<?>getDocuments(@RequestParam Integer applicationId,DocumentName name)

	{
		return ResponseEntity.status(200).contentType(MediaType.valueOf("image/jpeg")).body(adminService.getDocuments(applicationId,name));
	}
	
	@GetMapping("/getAllOwners") //get documents of single application
	public ResponseEntity<?>getOwners(@RequestParam(defaultValue = "0", required = false) int pageNumber)

	{

		return ResponseEntity.status(200).body(adminService.getAllOwners(pageNumber));
	}
	
	@PutMapping("/learnerApplication/updateStatus")
	public ResponseEntity<?>updateLearnerAppStatus(@RequestParam Integer LearnerAppId,Status status)
	{
		return ResponseEntity.status(200).body(learnerApplicationService.updateStatus(LearnerAppId,status));

	}
	
	@GetMapping("/getLearnerApplicationDetails/{learnerAppId}")
	public ResponseEntity<?>getLearnerApplicationDetails(@PathVariable Integer learnerAppId)

	{
		return ResponseEntity.status(200).body(adminService.getLearnerApplicationDetails(learnerAppId));
	}
	
	@GetMapping("/getVehicleInfo/{regNo}")
	public ResponseEntity<?>getVehicleDetails(@PathVariable String regNo)

	{
		return ResponseEntity.status(200).body(adminService.getVehicleService(regNo));
	}
	
	@PostMapping("/makeAnnouncement")
	public ResponseEntity<?> makeAnnouncement(@RequestBody Map<String, String> request) {
	    String subject = request.get("subject");
	    String body = request.get("body");
	    return ResponseEntity.status(200).body(adminService.makeAnnouncement(subject, body));
	}


	
	
}
