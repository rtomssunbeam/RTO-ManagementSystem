import React, { useState } from 'react';
import axios from 'axios';
import './styles/OwnerRegForm.css';
import { Link, useHistory } from 'react-router-dom';
import {Modal } from 'antd';

const VehOwnerRegistrationForm = () => {
  // State variables to hold owner details and documents
  const [ownerDto, setOwnerDto] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    adharcardNo: '',
    mobileNo: '',
    email: '',
    dob: '',
    postalAddressDto: {
      house: '',
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  });
  const history=useHistory();
  const [docs, setDocs] = useState([]);

  const [responseMsg, setResponseMsg] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('ownerDto', JSON.stringify(ownerDto));
      // Append each file to the FormData object
      docs.forEach((file, index) => {
        formData.append(`docs`, file);
      });
  
      // Make a POST request with FormData as the request body
      const response = await axios.post('http://localhost:8080/owner/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`
          
        }
      });

      if(response.status=200)
      {
        setResponseMsg("Owner Registered Successfully !!!");
        showModal();
      }
      console.log('Registration successful:', response.data);
      // Handle success
    } catch (error) {
      console.error('Error registering owner:', error);
      // Handle error
    }
  };

   const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
      // setOwnerDto(null);
      setResponseMsg(null); // Clear response message
      setOwnerDto({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        adharcardNo: '',
        mobileNo: '',
        email: '',
        dob: '',
        postalAddressDto: {
          house: '',
          street: '',
          city: '',
          state: '',
          country: '',
          zipCode: ''
        }
      });
      setDocs([]);
      history.push("/VehOwnerRegistrationForm");
  };

  // Function to handle changes in owner details
  const handleOwnerChange = (e) => {
    const { name, value } = e.target;
    setOwnerDto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle changes in postal address
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setOwnerDto(prevState => ({
      ...prevState,
      postalAddressDto: {
        ...prevState.postalAddressDto,
        [name]: value
      }
    }));
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerDto(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // JSX for the component
  // Rest of your code...


  return (
    <div className="OwnerRegCard transparent-OwnerRegCard">
      <div className="OwnerRegCard-header">
        <div className='registration-form-container'>
          <h2>Owner Registration</h2>
          <form onSubmit={handleSubmit}>
            {/* Input fields for owner details */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={ownerDto.firstName}
                    onChange={handleOwnerChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="middleName">Middle Name:</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={ownerDto.middleName}
                    onChange={handleOwnerChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={ownerDto.lastName}
                    onChange={handleOwnerChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            {/* Gender */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    value={ownerDto.gender}
                    onChange={handleOwnerChange}
                    className="form-control"
                  >
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="adharcardNo">Aadhar Card Number:</label>
                  <input
                    type="text"
                    id="adharcardNo"
                    name="adharcardNo"
                    value={ownerDto.adharcardNo}
                    onChange={handleOwnerChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="mobileNo">Mobile Number:</label>
                  <input
                    type="text"
                    id="mobileNo"
                    name="mobileNo"
                    value={ownerDto.mobileNo}
                    onChange={handleOwnerChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            {/* Email */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={ownerDto.email}
                    onChange={handleOwnerChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="dob">Date of Birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={ownerDto.dob}
                    onChange={handleOwnerChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="house">House:</label>
                  <input
                    type="text"
                    id="house"
                    name="house"
                    value={ownerDto.postalAddressDto.house}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            {/* Street */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="street">Street:</label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={ownerDto.postalAddressDto.street}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={ownerDto.postalAddressDto.city}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="state">State:</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={ownerDto.postalAddressDto.state}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            {/* Country */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={ownerDto.postalAddressDto.country}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="zipCode">Zip Code:</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={ownerDto.postalAddressDto.zipCode}
                    onChange={handleAddressChange}
                    className="form-control"
                  />
                </div>
                {/* Photo */}
                <div className="col-md-4">
                  <label htmlFor="docs1">Photo:</label>
                  <input
                    type="file"
                    id="docs1"
                    onChange={(e) => setDocs(prevDocs => [...prevDocs, e.target.files[0]])}
                    className="form-control-file"
                  />
                </div>
              </div>
            </div>
            {/* AddressProof */}
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="docs2">AddressProof:</label>
                  <input
                    type="file"
                    id="docs2"
                    onChange={(e) => setDocs(prevDocs => [...prevDocs, e.target.files[0]])}
                    className="form-control-file"
                  />
                </div>
                {/* Submit button */}
                <div className="col-md-4">
                  <div className="LearnerAppCard-footer text-center">
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
                <Modal title="Registration Success" open={isModalVisible} onOk={handleOk}>
                    <p>{responseMsg}</p>
                </Modal>
        </div>
      </div>
    </div>
  );
  
      
  
};

export default VehOwnerRegistrationForm;
