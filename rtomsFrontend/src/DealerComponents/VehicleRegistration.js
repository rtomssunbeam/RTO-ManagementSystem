import React, { useState } from 'react';
import axios from 'axios';
import './styles/OwnerRegForm.css';
import { Link, useHistory } from 'react-router-dom';
import {Modal } from 'antd';

const VehicleRegistration = () => {
  
  const [vehicleDto, setVehicleDto] = useState({
    id: '',
    modelName: '',
    brand: '',
    colour: '',
    chassisNumber: '',
    registrationNumber: '',
    ownership: '',
    dateOfManufacture: '',
    registrationDate: '',
    vehicleType: '',
    powerSource: '',
    status: '',
    adharNo: '',
  });
  const history=useHistory();
  const [responseMsg, setResponseMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [docs, setDocs] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('vehicleDto', JSON.stringify(vehicleDto));
      formData.append('docs', docs); // Append the document to FormData

      const response = await axios.post('http://localhost:8080/owner/addVehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`
        }
      });
      if(response.status=200)
      {
        setResponseMsg("Vehicle Registered Successfully !!!");
        showModal();
      }
      console.log('Vehicle Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering vehicle:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
  setVehicleDto({
    id: '',
    modelName: '',
    brand: '',
    colour: '',
    chassisNumber: '',
    registrationNumber: '',
    ownership: '',
    dateOfManufacture: '',
    registrationDate: '',
    vehicleType: '',
    powerSource: '',
    status: '',
    adharNo: '',
  });
  setDocs([]);
  setResponseMsg(null); // Clear response message
  
  history.push("/DealerDash");
};

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleDto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setDocs(e.target.files[0]);
  };

  return (
    <div className="OwnerRegCard transparent-OwnerRegCard">
      <div className="OwnerRegCard-header">
        <div className='registration-form-container'>
          <h2>Vehicle Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="row">
                
                <div className="col-md-4">
                  <label htmlFor="modelname">Model Name:</label>
                  <input
                    type="text"
                    id="modelName"
                    name="modelName"
                    value={vehicleDto.modelName}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="brand">Brand:</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={vehicleDto.brand}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>
                        {/* Rest of your input fields for vehicle details */}

                        <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="colour">Colour:</label>
                  <input
                    type="text"
                    id="colour"
                    name="colour"
                    value={vehicleDto.colour}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="chassisNumber">Chassis Number:</label>
                  <input
                    type="text"
                    id="chassisNumber"
                    name="chassisNumber"
                    value={vehicleDto.chassisNumber}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="registrationNumber">Registration Number:</label>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={vehicleDto.registrationNumber}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
              
                <div className="col-md-4">
                  <label htmlFor="ownership">Ownership:</label>
                  <input
                    type="text"
                    id="ownership"
                    name="ownership"
                    value={vehicleDto.ownership}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="dateOfManufacture">Date Of Manufacture:</label>
                  <input
                    type="date"
                    id="dateOfManufacture"
                    name="dateOfManufacture"
                    value={vehicleDto.dateOfManufacture}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="registrationDate">Registration Date:</label>
                  <input
                    type="date"
                    id="registrationDate"
                    name="registrationDate"
                    value={vehicleDto.registrationDate}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">

                <div className="col-md-4">
                  <label htmlFor="vehicleType">Vehicle Type:</label>
                  <select
                    name="vehicleType"
                    value={vehicleDto.vehicleType}
                    onChange={handleVehicleChange}
                    className='form-control'
                    required
                  >
                    <option value="" disabled>Select Vehicle Type</option>
                    <option value="MOTORCYCLE">Motor Cycle</option>
                    <option value="CAR">Car</option>
                    <option value="COMMERCIAL_VEHICLE">Commercial Vehicle</option>
                    <option value="THREE_WHEELER">Three Wheeler</option>
                    <option value="HEAVY_VEHICLE">Heavy Vehicle</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="powerSource">Power Source:</label>
                  <select
                    name="powerSource"
                    value={vehicleDto.powerSource}
                    onChange={handleVehicleChange}
                    className='form-control'
                    required
                  >
                    <option value="" disabled>Select Power Source</option>
                    <option value="PERTOL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="EV">EV</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="CNG">CNG</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="status">Vehicle Status:</label>
                  <select
                    name="status"
                    value={vehicleDto.status}
                    onChange={handleVehicleChange}
                    className='form-control'
                    required
                  >
                    <option value="" disabled>Select Vehicle Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">InActive</option>
                  </select>
                  
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="adharNo">Aadhar No:</label>
                  <input
                    type="number"
                    id="adharNo"
                    name="adharNo"
                    value={vehicleDto.adharNo}
                    onChange={handleVehicleChange}
                    className="form-control"
                    required
                  />
                </div>

              </div>
            </div>

            {/* File input for document upload */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="docs">Upload Document:</label>
                  <input
                    type="file"
                    id="docs"
                    name="docs"
                    onChange={handleFileChange}
                    className="form-control file-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <div className="LearnerAppCard-footer text-center">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
            <Modal title="Registration Success" open={isModalVisible}
                  onCancel={handleOk}  footer={[
                  <button key="ok" type="button" className="btn btn-primary" onClick={handleOk}>
                    OK
                  </button>
            ]}>
                      <p>{responseMsg}</p>
            </Modal>
        </div>
      </div>
    </div>
  );
};

export default VehicleRegistration;
