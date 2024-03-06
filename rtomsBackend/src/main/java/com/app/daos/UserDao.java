package com.app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dtos.UserDTO;
import com.app.entities.User;

public interface UserDao extends JpaRepository<User, Integer > {
	
	User findByEmail(String email);

}
