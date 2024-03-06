package com.app.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "address")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class PostalAddress extends BaseEntity {
	
	@Column(length = 60)
	private String house;
	@Column(length = 70)
	private String street;
	@Column(length = 20)
	private String city;
	@Column(length = 30)
	private String state;
	@Column(length = 30)
	private String country;
	@Column(length = 10, name = "zip_code")
	private String zipCode;
	// association mapping property
	// Demo of uni dir association , using shared PK approach
//	@OneToOne // can be configured as : (fetch=FetchType.LAZY) , if required
//	@JoinColumn(name = "application_id", nullable = false)
//	@MapsId
//	private LLApplication application;

	public PostalAddress(String street, String city, String state, String country, String zipCode) {
		super();
		this.house = house;
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zipCode = zipCode;
	}
}
