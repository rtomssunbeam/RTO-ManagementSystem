package com.app.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.app.enums.Status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "permanent_license_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@ToString(callSuper = true/*, exclude = { "profilePhoto", "educationalDocument","addressProof" }*/)
public class PermanentLicenseApplication extends BaseEntity {

	public PermanentLicenseApplication(LocalDateTime entryTime, LocalDateTime approvalTime, LocalDateTime validTime,
			LocalDate slotBooking, Status status) {
		super();
		this.entryTime = entryTime;
		this.approvalTime = approvalTime;
		this.validTime = validTime;
		this.slotBooking = slotBooking;
		this.status = status;
	}

	@OneToOne
	@JoinColumn(name = "learner_application_id", nullable = false, unique = true)
	private LearnerLicenseApplication learnerApplication;

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	private User user;
	
	@PrePersist
    public void prePersist() {
        this.entryTime = LocalDateTime.now(); // Set entryTime to the current server time before persisting the entity
    }

	@Column(name = "entry_time")
	private LocalDateTime entryTime;

	@Column(name = "approval_time")
	private LocalDateTime approvalTime;

	@Column(name = "valid_time")
	private LocalDateTime validTime;

	@Column(name = "slot_booking")
	private LocalDate slotBooking;

	@Enumerated(EnumType.STRING)
	@Column(name = "status", nullable = false)
	private Status status;

	@Override
	public String toString() {
		return "PermanentLicenseApplication [entryTime=" + entryTime + ", approvalTime=" + approvalTime + ", validTime="
				+ validTime + ", slotBooking=" + slotBooking + ", status=" + status + "]";
	}
}
