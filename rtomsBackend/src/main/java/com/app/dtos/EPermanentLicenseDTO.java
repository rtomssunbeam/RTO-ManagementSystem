package com.app.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import com.app.enums.BloodGroup;
import com.app.enums.Gender;
import com.app.enums.Qualification;
import com.app.enums.RtoOffice;
import com.app.enums.Status;
import com.app.enums.TestResult;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EPermanentLicenseDTO {
	@JsonProperty(access = Access.READ_ONLY) // used during serialization
	private Integer PermanentLicenseNumber;

	@NotBlank(message = "First name is required")
	@Size(max = 20, message = "First name must be at most 20 characters")
	private String firstName;

	@NotBlank(message = "Middle name is required")
	@Size(max = 20, message = "Middle name must be at most 20 characters")
	private String middleName;

	@NotBlank(message = "Last name is required")
	@Size(max = 20, message = "Last name must be at most 20 characters")
	private String lastName;

	@NotBlank(message = "Mobile number is required")
	private String mobileNumber;
	
	private String adharCardNumber;

	private PostalAddressDTO postalAddressDTO;

	@NotBlank(message = "Gender is required")
	private Gender gender;

	@NotBlank(message = "Blood Group is required")
	private BloodGroup bloodGroup;

	@Past(message = "the date must be from past")
	private LocalDate dateOfBirth;

	private Set<String> applicationTypes = new HashSet<>();
	
	@JsonProperty(access = Access.READ_ONLY)
	private Status status;
	
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime validTill;
}
