package com.app.service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.UserNotFoundException;
import com.app.custom_exceptions.VehicleNotFoundException;
import com.app.daos.OwnerDao;
import com.app.daos.UserDao;
import com.app.daos.VehicleDao;
import com.app.dtos.ApiResponse;
import com.app.dtos.OwnerDTO;
import com.app.dtos.VehicleDTO;
import com.app.entities.Owner;
import com.app.entities.PostalAddress;
import com.app.entities.User;
import com.app.entities.Vehicle;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@Transactional
public class VehicleServiceImpl implements VehicleService {
	
	@Autowired
	private OwnerDao ownerDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private VehicleDao vehicleDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private ObjectMapper objMapper;
	
	public ApiResponse register(String ownerString,ArrayList<MultipartFile>docs)
	{
		OwnerDTO ownerDto=null;
		Owner owner=null;
		PostalAddress postalAddress=null;
		
		try {
			ownerDto = objMapper.readValue(ownerString, OwnerDTO.class);
			postalAddress=mapper.map(ownerDto.getPostalAddressDto(), PostalAddress.class);
			owner=mapper.map(ownerDto, Owner.class);
			owner.setPostalAddress(postalAddress);
			owner.setAddressProofDoc(docs.get(0).getBytes());
			owner.setProfilePhoto(docs.get(1).getBytes());
		} catch (IOException e) {
			System.out.println("error in parsing MPFile into Byte Array");
			e.printStackTrace();
		}
		
		ownerDao.save(owner);
		return new ApiResponse("owner registered");
		
	}

	@Override
	public ApiResponse registerVehicle(String vehicleDtoStr, MultipartFile doc) {
		
		 VehicleDTO vehicleDto=null;
		 String ownerAdharNo;
		 String resp=null;
		 Owner owner=null;
		 try {
			vehicleDto=objMapper.readValue(vehicleDtoStr, VehicleDTO.class);
			ownerAdharNo=vehicleDto.getAdharNo();
			owner=ownerDao.findByAdharcardNo(ownerAdharNo);
			Vehicle vehicle=mapper.map(vehicleDto, Vehicle.class);
			vehicle.setVehiclePhoto(doc.getBytes());
			resp=owner.addVehicle(vehicle);
		} catch (IOException e) {
			System.out.println("error in parsing MPFile into Byte Array");
			e.printStackTrace();
		}
		 ownerDao.save(owner);
		
		
		return new ApiResponse(resp);
	}

	@Override
	public List<VehicleDTO> getVehicles(Integer userId) {
		
		List<Vehicle>vehicles=new ArrayList<Vehicle>();
		
		User curUser=userDao.findById(userId).orElseThrow( ()-> new UserNotFoundException("wrong userId"));
		String adharNo=curUser.getAdharcardNo();
		
		 vehicles=vehicleDao.findByOwnerAdharcardNo(adharNo);
		
		if(!vehicles.isEmpty())
		{
			return vehicles.stream().map(vehicle->mapper.map(vehicle, VehicleDTO.class)).collect(Collectors.toList());
		}
		
		return null;
	}

	@Override
	public VehicleDTO getVehicle(Integer vehicleId) {
		
		return mapper.map(vehicleDao.findById(vehicleId).orElseThrow(()->new VehicleNotFoundException("vehicle not found")), VehicleDTO.class);
	}

	@Override
	public List<VehicleDTO> getVehiclesByOwnerAdharNo(String ownerAdharNo) {
		
		List<Vehicle>vehicles=new ArrayList<Vehicle>();

		
		
		vehicles=vehicleDao.findByOwnerAdharcardNo(ownerAdharNo);
		
		
		if(!vehicles.isEmpty())
		{
			return vehicles.stream().map(vehicle->mapper.map(vehicle, VehicleDTO.class)).collect(Collectors.toList());
		}
		
		return null;
	}

	@Override
	public List<VehicleDTO> findMyVehiclesByUserId(String userId) {
		User user=userDao.findById(Integer.parseInt(userId)).orElseThrow(()->new UserNotFoundException("User Not Found"));
		String ownerAdharNo=user.getAdharcardNo();
		
		
List<Vehicle>vehicles=new ArrayList<Vehicle>();

		
		
		vehicles=vehicleDao.findByOwnerAdharcardNo(ownerAdharNo);
		
		
		if(!vehicles.isEmpty())
		{
			return vehicles.stream().map(vehicle->mapper.map(vehicle, VehicleDTO.class)).collect(Collectors.toList());
		}
		
		return new ArrayList<VehicleDTO>();
	}
}
