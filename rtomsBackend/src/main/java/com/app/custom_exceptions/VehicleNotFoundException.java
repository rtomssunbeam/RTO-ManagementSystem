package com.app.custom_exceptions;

public class VehicleNotFoundException extends RuntimeException {
	public VehicleNotFoundException(String errMesg) {
		super(errMesg);
	}
}

