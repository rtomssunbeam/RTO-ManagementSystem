package com.app.service;

import javax.validation.Valid;

import com.app.dtos.ApiResponse;
import com.app.dtos.PermanentLicenseApplicationDTO;
import com.app.enums.Status;

public interface PermanentLicenseApplicationService {

	public ApiResponse addPermanentLicenseApplicaation(PermanentLicenseApplicationDTO permanentLicenseApplicationDTO);

	public ApiResponse updateStatus(@Valid Integer permanentAppId, Status status);

}
