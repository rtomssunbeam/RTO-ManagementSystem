package com.app.dtos;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.app.entities.LearnerLicenseApplication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ApplicationTypeDTO {
   
	
	
	@NotBlank(message = "Application type is required")
    @Size(max = 255, message = "Application type must be at most 255 characters")
    private String applicationType;
    
    private Set<LearnerLicenseApplication> learnerLicenseApplications=new HashSet<>();



}
