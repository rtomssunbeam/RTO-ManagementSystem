package com.app.dtos;

import com.app.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnerDTO {
    @NotBlank(message = "First name is required")
    private String firstName;

    private String middleName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @NotBlank(message = "Aadhar card number is required")
    @Pattern(regexp = "\\d{12}", message = "Aadhar card number must be 12 digits")
    private String adharcardNo;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "\\d{10}", message = "Mobile number must be 10 digits")
    private String mobileNo;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dob;

    private PostalAddressDTO postalAddressDto;

}


//    private MultipartFile addressProofDoc;
//    private MultipartFile profilePhoto;
    
   /*
    {
  "firstName": "rajdeep",
  "middleName": "shankar",
  "lastName": "sutar",
  "gender": "MALE",
  "adharcardNo": "218635357770",
  "mobileNo": "9503842751",
  "email": "raj@gmail.com",
  "dob": "2000-07-12",
  "postalAddressDto": {
    "house": "Plot49 DattaPrasad",
    "street": "RamaUdyanPhase3" ,
    "city": "Miraj",
    "state": "MH",
    "country": "India",
    "zipCode": "416410"
  }
}
    * */
    
    

