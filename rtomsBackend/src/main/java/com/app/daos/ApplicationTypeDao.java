package com.app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.ApplicationType;

public interface ApplicationTypeDao extends JpaRepository<ApplicationType, Integer> {

	

	ApplicationType findByApplicationType(String s);
}
