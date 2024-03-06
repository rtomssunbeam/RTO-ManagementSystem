package com.app.dtos;

import com.app.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Integer id;
	
	@NotBlank(message = "Email is required!")
    @Email(message = "Please provide a valid email address")
    private String email;

	@NotBlank(message = "Adhar card number is required!")
	@Size(min = 12, max =12, message = "Adhar card number must be 12 digits")
	private String adharcardNo;
	
    @NotBlank(message = "First name is required")
    @Size(max = 20, message = "First name must be at most 20 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 20, message = "Last name must be at most 20 characters")
    private String lastName;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    @JsonProperty(access=Access.READ_ONLY)
    private Role role;
}
