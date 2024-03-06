package com.app.entities;

import javax.persistence.*;

import com.app.enums.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.*;

@Entity
@Table(name = "learner_license_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LearnerLicenseApplication extends BaseEntity {

	public LearnerLicenseApplication(String firstName, String middleName, String lastName, String mobileNumber,
			PostalAddress postalAddress, Gender gender, BloodGroup bloodGroup, LocalDate dateOfBirth,
			RtoOffice rtoOffice, Qualification qualification, LocalDateTime entryTime, LocalDateTime approvalTime,
			LocalDateTime validTime, Status status) {
		super();
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
		this.mobileNumber = mobileNumber;
		this.postalAddress = postalAddress;
		this.gender = gender;
		this.bloodGroup = bloodGroup;
		this.dateOfBirth = dateOfBirth;
		this.rtoOffice = rtoOffice;
		this.qualification = qualification;
		this.entryTime = LocalDateTime.now();
		;
		this.approvalTime = approvalTime;
		this.validTill = validTime;
		this.status = status;
	}

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User user;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "middle_name")
	private String middleName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "mobile_number")
	private String mobileNumber;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "address_id", referencedColumnName = "id")
//	@MapsId("id") // Map id to the primary key of PostalAddress
	private PostalAddress postalAddress;

	@Column(name = "gender")
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(name = "blood_group")
	@Enumerated(EnumType.STRING)
	private BloodGroup bloodGroup;

	@Column(name = "date_of_birth")
	private LocalDate dateOfBirth;

	@Enumerated(EnumType.STRING)
	@Column(name = "rto_office")
	private RtoOffice rtoOffice;

	@Enumerated(EnumType.STRING)
	@Column(name = "qualification")
	private Qualification qualification;
	

	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name = "id", referencedColumnName = "id")
	@MapsId("id") // Map id to the primary key of Document
	private Document myDocument;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "application_application_type", joinColumns = @JoinColumn(name = "application_id"), inverseJoinColumns = @JoinColumn(name = "application_type_id"))
	private Set<ApplicationType> applicationTypes = new HashSet<>();

	@PrePersist
	public void prePersist() {
		this.entryTime = LocalDateTime.now(); // Set entryTime to the current server time before persisting the entity
	}

	@Column(name = "entry_time")
	private LocalDateTime entryTime;

	@Column(name = "approval_time")
	private LocalDateTime approvalTime;

	@Column(name = "valid_till")
	private LocalDateTime validTill;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private Status status;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "test_result")
	private TestResult result;
	
	public void addType(ApplicationType applicationType) {
		this.applicationTypes.add(applicationType);
		applicationType.getLearnerLicenseApplications().add(this);
	}

	@Override
	public String toString() {
		return "LearnerLicenseApplication [firstName=" + firstName + ", middleName=" + middleName + ", lastName="
				+ lastName + ", mobileNumber=" + mobileNumber + ", postalAddress=" + postalAddress + ", gender="
				+ gender + ", bloodGroup=" + bloodGroup + ", dateOfBirth=" + dateOfBirth + ", rtoOffice=" + rtoOffice
				+ ", qualification=" + qualification + ", entryTime=" + entryTime + ", approvalTime=" + approvalTime
				+ ", validTime=" + validTill + ", status=" + status + "]";
	}
}
