package com.app.daos;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.PermanentLicenseApplication;

public interface PermanentApplicationDao extends JpaRepository<PermanentLicenseApplication, Integer> {

	PermanentLicenseApplication findByUserId(Integer userId);
	
	List<PermanentLicenseApplication> findAllByOrderBySlotBookingAsc(Pageable pageable);

}
