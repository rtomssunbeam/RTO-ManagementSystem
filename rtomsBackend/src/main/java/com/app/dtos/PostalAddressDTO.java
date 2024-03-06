package com.app.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PostalAddressDTO {
	
	@NotBlank(message = "House is required")
	private String house;
	
	@NotBlank(message = "Street is required")
	private String street;
	
	@NotBlank(message = "city is required")
	private String city;
	
	private String state;
	private String country;
	
	@NotBlank(message = "Zip code is required")
	@Size(max = 10, message = "Zip code must be at most 10 characters")
	private String zipCode;


}
