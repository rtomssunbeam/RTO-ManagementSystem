package com.app.entities;
import java.time.LocalDate;

import javax.persistence.*;

import com.app.enums.PowerSource;
import com.app.enums.VehicleStatus;
import com.app.enums.VehicleType;

import lombok.AllArgsConstructor;
import lombok.*;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle extends BaseEntity {
 
    
    @Column(name = "model_name", nullable = false)
    private String modelName;
    
    @Column(name = "brand", nullable = false)
    private String brand;
    
    @Column(name = "colour", nullable = false)
    private String colour;
    
    @Column(name = "chassis_number", nullable = false, unique = true)
    private String chassisNumber;
    
    @Column(name = "registration_number", nullable = false, unique = true)
    private String registrationNumber;
    
    @Column(name = "ownership", nullable = false)
    private String ownership;
    
    @Column(name = "date_of_manufacture", nullable = false)
    private LocalDate dateOfManufacture;
    
    @Column(name = "registration_date", nullable = false)
    private LocalDate registrationDate;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_type", nullable = false)
    private VehicleType vehicleType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "power_source", nullable = false)
    private PowerSource powerSource;
   
    @Lob
    @Column(name = "vehicle_photo")
    private byte[] vehiclePhoto;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private VehicleStatus status;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private Owner owner;
    
}
