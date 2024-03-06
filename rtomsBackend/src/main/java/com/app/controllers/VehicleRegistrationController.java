package com.app.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dtos.OwnerDTO;
import com.app.dtos.VehicleDTO;
import com.app.service.VehicleService;

@RestController
@RequestMapping("/owner")
@CrossOrigin(origins = "http://localhost:3000")
public class VehicleRegistrationController {

	@Autowired
	private VehicleService vehicleService;
	
	
	@PostMapping(value="/register",consumes = "multipart/form-data")
	public ResponseEntity<?>register(@RequestParam String ownerDto,@RequestParam MultipartFile [] docs)
	{
		System.out.println(ownerDto);
		System.out.println(docs.length);
		ArrayList <MultipartFile> documents= new ArrayList<MultipartFile>();
		for(MultipartFile each:docs)
		{
			documents.add(each);
		}
		
		return ResponseEntity.status(200).body(vehicleService.register(ownerDto,documents));		
	}
	
	@PostMapping(value="/addVehicle",consumes = "multipart/form-data")
	public ResponseEntity<?>registerVehicle(@RequestParam String vehicleDto,@RequestParam MultipartFile docs)
	{
		return ResponseEntity.status(200).body(vehicleService.registerVehicle(vehicleDto,docs));
		
	}
	
	@GetMapping(value="/getMyVehicles")
	public ResponseEntity<?>getMyVehicles(@RequestParam Integer UserId)
	{
		return ResponseEntity.status(200).body(vehicleService.getVehicles(UserId));	
	}
	
	@GetMapping(value="/getMyVehicles/getVehicle")
	public ResponseEntity<?>getMyVehicle(@RequestParam Integer vehicleId)
	{
		return ResponseEntity.status(200).body(vehicleService.getVehicle(vehicleId));
		
	}
	
	
	@GetMapping(value="/getVehiclesByOwnerId")
	ResponseEntity<?>getVehiclesByOwnerId(@RequestParam String OwnerAdharNo)
	{
		return ResponseEntity.status(200).body(vehicleService.getVehiclesByOwnerAdharNo(OwnerAdharNo));
	}
	
	@GetMapping(value="/findMyVehicle")
	ResponseEntity<?>findMyVehiclesByUserId(@RequestParam String userId)
	{
		return ResponseEntity.status(200).body(vehicleService.findMyVehiclesByUserId(userId));
	}
	
	
}
