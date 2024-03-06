package com.app.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.daos.LearnerApplicationDao;
import com.app.daos.PermanentApplicationDao;
import com.app.daos.UserDao;
import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.dtos.LicenseApplicationDTO;
import com.app.dtos.PermanentLicenseApplicationDTO;
import com.app.dtos.SignInDTO;
import com.app.dtos.UserDTO;
import com.app.entities.BaseEntity;
import com.app.entities.LearnerLicenseApplication;
import com.app.entities.PermanentLicenseApplication;
import com.app.entities.User;
import com.app.enums.Role;

@Service
public class UserServiceImpl implements UserService  {
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private LearnerApplicationDao learnerAppDao;
	
	@Autowired
	private PermanentApplicationDao permanentAppDao;
	
	@Autowired
	private PasswordEncoder encoder;
	
	
	@Autowired
	private ModelMapper mapper;
	
	public void addUser(UserDTO userDTO)
	{
		User user=mapper.map(userDTO, User.class);
		user.setRole(Role.ROLE_USER);
		user.setPassword(encoder.encode(user.getPassword()));
		
		userDao.save(user);
	}
	
	@Override
	public User authenticate(SignInDTO userDto) {
		
		return userDao.findByEmail(mapper.map(userDto, User.class).getEmail());
	}

	@Override
	public List<User> getAllUsers() {
		
		return null;
	}
	
	
	@Override
	@Transactional
	public List<LicenseApplicationDTO> getMyApplications(Integer userId) {
		
		List<LicenseApplicationDTO>myApplications=new ArrayList<>();
		LearnerLicenseApplication learnerApplication = learnerAppDao.findByUserId(userId);
		PermanentLicenseApplication permanentApplication = permanentAppDao.findByUserId(userId);
		System.out.println(learnerApplication);
		
		if(learnerApplication!=null) {
			LearningLicenseApplicationDTO learnerApp= mapper.map(learnerApplication, LearningLicenseApplicationDTO.class);
			System.out.println(learnerApplication);
			myApplications.add(new LicenseApplicationDTO(learnerApp.getId(),"Learner License",learnerApp.getStatus(),learnerApplication.getValidTill()));
		}
		if(permanentApplication !=null)
		{
			PermanentLicenseApplicationDTO permanentApp = mapper.map(permanentApplication, PermanentLicenseApplicationDTO.class);
			myApplications.add(new LicenseApplicationDTO(permanentApp .getId(),"Permanent License",permanentApp.getStatus(),permanentApplication.getValidTime()));
		}
		
		return myApplications;
	}
	

	

	

}
