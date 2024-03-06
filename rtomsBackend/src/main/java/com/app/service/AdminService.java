package com.app.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.dtos.OwnerDTO;
import com.app.dtos.PermanentLicenseApplicationDTO;
import com.app.dtos.UserDTO;
import com.app.dtos.VehicleDTO;
import com.app.entities.Owner;
import com.app.enums.DocumentName;

public interface AdminService {

	List<UserDTO> getAllUsersPaginated(int pageNumber);
	List<LearningLicenseApplicationDTO> getAllLearnerLicensePaginated(int pageNumber);
	byte[] getDocuments(Integer applicationId, DocumentName name);
	List<OwnerDTO> getAllOwners(int pageNumber);
	LearningLicenseApplicationDTO getLearnerApplicationDetails(Integer learnerAppId);
	VehicleDTO getVehicleService(String regNo);
	List<PermanentLicenseApplicationDTO> getAllPermanentLicensePaginated(int pageNumber);
	String makeAnnouncement(String subject, String text);


	
	
}
