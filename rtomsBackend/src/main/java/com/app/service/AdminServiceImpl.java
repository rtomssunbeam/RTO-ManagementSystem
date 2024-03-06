package com.app.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.app.controllers.LearnerLicenseApplicationController;
import com.app.daos.LearnerApplicationDao;
import com.app.daos.OwnerDao;
import com.app.daos.PermanentApplicationDao;
import com.app.daos.UserDao;
import com.app.daos.VehicleDao;
import com.app.dtos.ApplicationTypeDTO;
import com.app.dtos.DocumentDTO;
import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.dtos.OwnerDTO;
import com.app.dtos.PermanentLicenseApplicationDTO;
import com.app.dtos.PostalAddressDTO;
import com.app.dtos.UserDTO;
import com.app.dtos.VehicleDTO;
import com.app.entities.Document;
import com.app.entities.LearnerLicenseApplication;
import com.app.entities.Owner;
import com.app.entities.PermanentLicenseApplication;
import com.app.entities.PostalAddress;
import com.app.entities.User;
import com.app.entities.Vehicle;
import com.app.enums.DocumentName;

import ch.qos.logback.classic.Logger;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
    private JavaMailSender javaMailSender;
	
	@Autowired
	private OwnerDao ownerDao;
	
	@Autowired
	private LearnerApplicationDao learnerApplicationDao;
	
	@Autowired
	private PermanentApplicationDao permanentApplicationDao;
	
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private VehicleDao vehicleDao;
	
	private org.slf4j.Logger logger = LoggerFactory.getLogger(AdminServiceImpl.class);
	
	@Override
	public List<UserDTO> getAllUsersPaginated(int pageNumber) {
		
		Pageable pageable=PageRequest.of(pageNumber, 10);
		List<User>usersList=userDao.findAll(pageable).getContent();
		
		return usersList.stream().map(user->mapper.map(user,UserDTO.class)).collect(Collectors.toList());
	}

	
//Below methos doesnot set postal address into DTO object present in list, even though select query is fired in address table
	@Override
	public List<LearningLicenseApplicationDTO> getAllLearnerLicensePaginated(int pageNumber) {
		
		List<PostalAddress>address=new ArrayList<>();
		Pageable pageable=PageRequest.of(pageNumber, 10);
		
		List<LearnerLicenseApplication>list=learnerApplicationDao.findAll(pageable).getContent(); //gives list of all applications
	
		List<LearningLicenseApplicationDTO>applications=
				list.stream()
				.map(eachApplication->mapper.map(eachApplication,LearningLicenseApplicationDTO.class))
				.collect(Collectors.toList());
		
		 return applications ;
	}


	@Override
	public byte[] getDocuments(Integer applicationId, DocumentName name) {
		
			LearnerLicenseApplication application =  learnerApplicationDao.findById(applicationId).orElseThrow();
			if(name.equals(DocumentName.ADDRESS_PROOF))
			{
				return application.getMyDocument().getAddressProof();
			}
			else if(name.equals(DocumentName.EDUCATIONAL_DOC))
			{
				return application.getMyDocument().getAddressProof();
			}
			else if(name.equals(DocumentName.PROFILE_PICTURE))
			{
				return application.getMyDocument().getAddressProof();
			}
			
			
			
		
		return null;
		
	}


	@Override
	public List<OwnerDTO> getAllOwners(int pageNumber) {
		
		Pageable pageable=PageRequest.of(pageNumber, 10);
		
		List<Owner>allOwners=ownerDao.findAll(pageable).getContent();
		
		List<OwnerDTO>owners=allOwners.stream()
//		.filter(owner->!owner.getVehicles().isEmpty())
		.map(owner->mapper.map(owner, OwnerDTO.class))
		.collect(Collectors.toList());
		
		return owners;

		
	}


	@Override
	public LearningLicenseApplicationDTO getLearnerApplicationDetails(Integer learnerAppId) {
		LearnerLicenseApplication learnerLicenseAppDetails =learnerApplicationDao.findById(learnerAppId).orElseThrow();
		LearningLicenseApplicationDTO applicationDTO = mapper.map(learnerLicenseAppDetails, LearningLicenseApplicationDTO.class);
        PostalAddress postalAddress = learnerLicenseAppDetails.getPostalAddress();
        if (postalAddress != null) {
            PostalAddressDTO postalAddressDTO = mapper.map(postalAddress, PostalAddressDTO.class);
            System.out.println(postalAddressDTO);
            applicationDTO.setPostalAddressDTO(postalAddressDTO);
            applicationDTO.setUserId(learnerLicenseAppDetails.getUser().getId());
        }
        
		return applicationDTO;
	}


	@Override
	public VehicleDTO getVehicleService(String regNo) {
		
		Vehicle vehicle=vehicleDao.getByRegistrationNumber(regNo);
		if(vehicle!=null)
		{
			return mapper.map(vehicle, VehicleDTO.class);
			
		}
		return null;
	}


	@Override
	public List<PermanentLicenseApplicationDTO> getAllPermanentLicensePaginated(int pageNumber) {
		Pageable pageable=PageRequest.of(pageNumber, 10);
		
		List<PermanentLicenseApplication>permanentAppList=permanentApplicationDao.findAllByOrderBySlotBookingAsc(pageable);
		
		logger.info(permanentAppList.toString());
		
		if(permanentAppList.size()>0) {
		List<PermanentLicenseApplicationDTO>permanantDtoList=permanentAppList.stream().map(each->mapper.map(permanentAppList, PermanentLicenseApplicationDTO.class))
		.collect(Collectors.toList());
		
		for(PermanentLicenseApplicationDTO eachDtoObj : permanantDtoList)
		{
			for(PermanentLicenseApplication eachPermanentApp : permanentAppList)
			{
				eachDtoObj.setFirstName(eachPermanentApp.getLearnerApplication().getFirstName());
				eachDtoObj.setLastName(eachPermanentApp.getLearnerApplication().getLastName());
				eachDtoObj.setLearnerApplicationId(eachPermanentApp.getLearnerApplication().getId());
				eachDtoObj.setUserId(eachPermanentApp.getUser().getId());
				eachDtoObj.setId(eachPermanentApp.getId());
				eachDtoObj.setSlotBooking(eachPermanentApp.getSlotBooking());
				eachDtoObj.setStatus(eachPermanentApp.getStatus());
			}
		}
		logger.info(permanantDtoList.toString());
		return permanantDtoList ;}
		
		return new ArrayList<PermanentLicenseApplicationDTO>();
	}


	@Override
	public String makeAnnouncement(String subject, String text) {
		
		
		
		List<User>users=userDao.findAll();
		
		logger.info(subject);
		logger.info(text);
		
		
		
		for(User user:users)
		{
			SimpleMailMessage message = new SimpleMailMessage();
			message.setSubject(subject);
	        message.setText(text);
			message.setTo(user.getEmail());
			javaMailSender.send(message);
			
		}
		
		
		return "announcement failed";
		
	}
}

//Below method fetches postal address
//	@Override
//	public List<LearningLicenseApplicationDTO> getAllLearnerLicensePaginated(int pageNumber) {
//	    Pageable pageable = PageRequest.of(pageNumber, 10);
//	    List<LearnerLicenseApplication> list = learnerApplicationDao.findAll(pageable).getContent();
//
//	    List<LearningLicenseApplicationDTO> applications = list.stream()
//	            .map(eachApplication -> {
//	                LearningLicenseApplicationDTO applicationDTO = mapper.map(eachApplication, LearningLicenseApplicationDTO.class);
//	                PostalAddress postalAddress = eachApplication.getPostalAddress();
//	                System.out.println(postalAddress);
//	                if (postalAddress != null) {
//	                    PostalAddressDTO postalAddressDTO = mapper.map(postalAddress, PostalAddressDTO.class);
//	                    System.out.println(postalAddressDTO);
//	                    applicationDTO.setPostalAddressDTO(postalAddressDTO);
//	                    applicationDTO.setUserId(eachApplication.getUser().getId());
//	                }
//	                return applicationDTO;
//	            })
//	            .collect(Collectors.toList());
//
//	    return applications;
//	}
//}

	
