package com.app.custom_exceptions;


public class ApplicationDoesNotExistException extends RuntimeException{

	public ApplicationDoesNotExistException(String string) {
		super(string);
	}

}
