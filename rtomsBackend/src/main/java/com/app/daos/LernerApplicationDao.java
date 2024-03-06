package com.app.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.LearnerLicenseApplication;

public interface LernerApplicationDao extends JpaRepository<LearnerLicenseApplication, Integer> {

}
