package com.app.entities;
import javax.persistence.*;

import com.app.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "owners")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Owner extends BaseEntity {
   
    
    @Column(name = "first_name")
    private String firstName;
    
    @Column(name = "middle_name")
    private String middleName;
    
    @Column(name = "last_name")
    private String lastName;
    
    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;
    
    @Column(name = "adharcard_no")
    private String adharcardNo;
    
    @Column(name = "mobile_no")
    private String mobileNo;
   
    @Column(name="email")
    private String email;
    
    @Column(name = "dob")
    private LocalDate dob;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "postal_address_id", referencedColumnName = "id")
    private PostalAddress postalAddress;
    
    @Column(name="address_proof_document")
    @Lob
    private byte[] addressProofDoc;
    
    @Lob
    @Column(name = "profile_photo")
    private byte[] profilePhoto;
    
    
    @Column(name = "entry_time")
    private LocalDateTime entryTime;
    @PrePersist
	public void prePersist() {
		this.entryTime = LocalDateTime.now(); // Set entryTime to the current server time before persisting the entity
	}
    
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Vehicle> vehicles = new ArrayList<>();
    
    public String addVehicle(Vehicle vehicle)
    {	
    	this.vehicles.add(vehicle);
    	vehicle.setOwner(this);
		return "vehicle added to "+this.email+" user";
    	
    }
    
    
    
}
