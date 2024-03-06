package com.app.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.app.enums.Status;
import com.app.validation.FutureOrTwoWeeks;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PermanentLicenseApplicationDTO {

	public PermanentLicenseApplicationDTO() {
		this.status = Status.PENDING; // Set default value as PENDING during object creation
	}

	@JsonProperty(access = Access.READ_ONLY) // used during serialization
	private Integer id;
	
	@JsonProperty(access = Access.READ_ONLY) // used during serialization
	private String firstName;
	
	@JsonProperty(access = Access.READ_ONLY) // used during serialization
	private String LastName;
	
	

	@NotNull(message = "User ID is required")
	private Integer userId;

	// used during de-serialization
	@NotNull(message = "Learner application is required")
	private Integer learnerApplicationId;

	@FutureOrTwoWeeks(message = "Slot booking must be within the next two weeks from present day")
	private LocalDate slotBooking;
	
	@JsonProperty(access = Access.READ_ONLY)
	private Status status;
}
