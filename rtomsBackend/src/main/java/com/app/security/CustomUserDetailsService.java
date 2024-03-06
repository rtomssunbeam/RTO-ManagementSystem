package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.UserNotFoundException;
import com.app.daos.UserDao;
import com.app.entities.User;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	// dep : dao layer
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException 
	
	{
		User user = userDao.findByEmail(email);
		if(user==null)
		{
			throw new UserNotFoundException("user not found for this email !!!");
		}
				
		return new CustomUserDetails(user);
	}

}
