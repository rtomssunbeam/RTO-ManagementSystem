package com.app.dtos;

import com.app.enums.PowerSource;
import com.app.enums.VehicleStatus;
import com.app.enums.VehicleType;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {

	@JsonProperty(access=Access.READ_ONLY)
	private Integer id;
	
    @NotBlank
    @Size(max = 50)
    private String modelName;

    @NotBlank
    @Size(max = 50)
    private String brand;

    @NotBlank
    @Size(max = 30)
    private String colour;

    @NotBlank
    @Size(max = 25)
    private String chassisNumber;

    @NotBlank
    @Size(max = 20)
    private String registrationNumber;

    @NotBlank
    @Size(max = 15)
    private String ownership;

    @NotNull
    private LocalDate dateOfManufacture;

    @NotNull
    private LocalDate registrationDate;

    @NotNull
    private VehicleType vehicleType;

    @NotNull
    private PowerSource powerSource;

//    @NotNull
//    private MultipartFile vehiclePhoto;

    @NotNull
    private VehicleStatus status;

    @NotNull
    private String adharNo; 
}

/*
{
	  "modelName": "Harrter",
	  "brand": "Tata",
	  "colour": "black",
	  "chassisNumber": "123456789",
	  "registrationNumber": "MH10DH4557",
	  "ownership": "FIRST",
	  "dateOfManufacture": "2024-02-16",
	  "registrationDate": "2024-02-16",
	  "vehicleType": "CAR",
	  "powerSource": "DIESEL",
	  "status": "ACTIVE",
	  "adharNo": 218635357770
	}
*/
