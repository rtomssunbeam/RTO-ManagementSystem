package com.app.daos;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.LearnerLicenseApplication;
import com.app.enums.Status;

public interface LearnerApplicationDao extends JpaRepository<LearnerLicenseApplication, Integer> {

	LearnerLicenseApplication findByUserId(Integer userId);

	@Modifying
	@Query(value = "update learner_license_applications set status = 'EXPIRED' where status = 'APPROVED' and valid_till < CURRENT_TIMESTAMP()", nativeQuery = true)
	 void expireLearanerApplications();
	
	@Query("select a.user.email from LearnerLicenseApplication a where a.status = 'APPROVED' and a.validTill < :currentDateTime")
	List<String> findByStatus(@Param("currentDateTime") LocalDateTime currentDateTime);


}
