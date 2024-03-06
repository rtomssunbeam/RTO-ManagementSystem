package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.web.multipart.MultipartFile;

import com.app.dtos.ApiResponse;
import com.app.dtos.OwnerDTO;
import com.app.dtos.VehicleDTO;
import com.app.entities.Owner;

public interface VehicleService {
ApiResponse register(@Valid String ownerDto, ArrayList<MultipartFile> docs);

ApiResponse registerVehicle(String vehicleDto, MultipartFile docs);

List<VehicleDTO> getVehicles(Integer userId);

VehicleDTO getVehicle(Integer vehicleId);

List<VehicleDTO> getVehiclesByOwnerAdharNo(String ownerAdharNo);

List<VehicleDTO> findMyVehiclesByUserId(String userId);
}
