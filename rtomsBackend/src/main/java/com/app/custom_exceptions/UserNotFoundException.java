package com.app.custom_exceptions;

import java.util.function.Supplier;

public class UserNotFoundException extends RuntimeException {
	public UserNotFoundException(String errMesg) {
		super(errMesg);
	}

}
