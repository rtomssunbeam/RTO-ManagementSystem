package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.app.dtos.LearningLicenseApplicationDTO;
import com.app.dtos.LicenseApplicationDTO;
import com.app.dtos.SignInDTO;
import com.app.dtos.UserDTO;
import com.app.entities.BaseEntity;
import com.app.entities.User;

public interface UserService {

	 void addUser(UserDTO user);

	User authenticate(SignInDTO userDto);

	List<User> getAllUsers();

	List<LicenseApplicationDTO> getMyApplications(Integer userId);
}

//JavaRT



