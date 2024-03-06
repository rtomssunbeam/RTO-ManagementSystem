import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // Import the named export jwtDecode instead of the default export

import axios from 'axios';

import { Form } from 'antd';
import styled from 'styled-components';

import './styles/LLForm.css'


const StyledForm = styled(Form)`
  label {
    font-weight: bold;
  }

  .ant-btn-primary {
    margin-right: 8px;
  }

  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
  }
`;

const LearnerLicenseApplicationForm = () => {
    const history = useHistory();
    const url = "http://127.0.0.1:8080/lernerLicense/application"

    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        mobileNumber: '',
        userId: '', 
        postalAddressDTO: {
            house: '',
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
        },
        gender: '',
        bloodGroup: '',
        dateOfBirth: '',
        rtoOffice: '',
        qualification: '',
        applicationTypes: [],
        files: [null, null, null], // For storing uploaded files
    });
    // const [files, setFiles] = useState({files:[null,null,null],});

    useEffect(() => {

        const tokenReceived=sessionStorage.getItem('authToken');
        
        if (tokenReceived) {

            const decodedToken = jwtDecode(tokenReceived); 
            const userId = decodedToken.userId; // Assuming the userId is stored in the token as 'userId'
            if (userId) {
                setFormData(prevData => ({
                    ...prevData,
                    userId: userId
                }));
            }
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePostalAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            postalAddressDTO: {
                ...prevData.postalAddressDTO,
                [name]: value,
            },
        }));
    };
    const handleApplicationTypeChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prevData) => {
            if (checked) {
                return {
                    ...prevData,
                    applicationTypes: [...prevData.applicationTypes, name],
                };
            } else {
                return {
                    ...prevData,
                    applicationTypes: prevData.applicationTypes.filter((type) => type !== name),
                };
            }
        });
    };

    

    const handleFileInputChange = (e, fileInputIndex) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => {
            const updatedFiles = [...prevData.files];
            
            // Check if the element at fileInputIndex is null
            if (updatedFiles[fileInputIndex] === null) {
                updatedFiles[fileInputIndex] = files;
            } else {
                updatedFiles[fileInputIndex] = [...files];
            }
            
            // console.log(formData.files)
            return {
                ...prevData,
                files: updatedFiles,
            };
        });
    };


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const birthDate = new Date(formData.dateOfBirth);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();
    
        // Check if the user is older than 18
        if (age < 18) {
            alert("You must be at least 18 years old to apply for a license.");
            return;
        }
        

        try {
            
            const formDataNew = new FormData();
            
            var { files , ...userDetails} = formData;
            files = files.flat()
            formDataNew.append("userDetails",JSON.stringify(userDetails))
            
                formDataNew.append(`file1`, files[0]);
                formDataNew.append(`file2`, files[1]);
                formDataNew.append(`file3`, files[2]);
            

            const response = await axios.post(url, formDataNew, {
                
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`

                }
            });

            console.log('Server response:', response.data);
            history.push(`/McqTest/${response.data.id}`);


            
        } catch (error) {
            console.error('Error submitting form:', error);
            
        }
    };


    return (
        <div className='StyledBox'>
            <h2>Learner License Application Form</h2>
            <hr />
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name: 
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Middle Name:
                        <input
                            type="text"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </label>

                    <label>
                        mobileNumber:
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                        />
                    </label>


                    {/* Postal Address input fields */}
                    <label>
                        House:
                        <input
                            type="text"
                            name="house"
                            value={formData.postalAddressDTO.house}
                            onChange={handlePostalAddressChange}
                        />
                    </label>
                    <label>
                        Street:
                        <input
                            type="text"
                            name="street"
                            value={formData.postalAddressDTO.street}
                            onChange={handlePostalAddressChange}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={formData.postalAddressDTO.city}
                            onChange={handlePostalAddressChange}
                        />
                    </label>
                    <label>
                        State:
                        <input
                            type="text"
                            name="state"
                            value={formData.postalAddressDTO.state}
                            onChange={handlePostalAddressChange}
                        />
                    </label>
                    <label>
                        Country:
                        <input
                            type="text"
                            name="country"
                            value={formData.postalAddressDTO.country}
                            onChange={handlePostalAddressChange}
                        />
                    </label>
                    <label>
                        Zip Code:
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.postalAddressDTO.zipCode}
                            onChange={handlePostalAddressChange}
                        />
                    </label>


                    <label>
                        dateOfBirth:
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                        />
                    </label>

                    {/* Gender dropdown */}
                    <label>
                        Gender:
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </label>

                    {/* BloodGroup dropdown */}
                    <label>
                        Blood Group:
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                        >
                            <option value="A_POSITIVE">A Positive</option>
                            <option value="A_NEGATIVE">A Negative</option>
                            <option value="B_POSITIVE">B Positive</option>
                            <option value="B_NEGATIVE">B Negative</option>
                            <option value="AB_POSITIVE">AB Positive</option>
                            <option value="AB_NEGATIVE">AB Negative</option>
                            <option value="O_POSITIVE">O Positive</option>
                            <option value="O_NEGATIVE">O Negative</option>
                        </select>
                    </label>

                    {/* Qualification dropdown */}
                    <label>
                        Qualification:
                        <select
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleInputChange}
                        >
                            <option value="BELOWSSC">Below SSC</option>
                            <option value="SSC">SSC</option>
                            <option value="HSC">HSC</option>
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                        </select>
                    </label>

                    {/* RtoOffice dropdown */}
                    <label>
                        RTO Office:
                        <select
                            name="rtoOffice"
                            value={formData.rtoOffice}
                            onChange={handleInputChange}
                        >
                            <option value="KOLHAPUR">Kolhapur</option>
                            <option value="SANGLI">Sangli</option>
                            <option value="SATARA">Satara</option>
                            <option value="PUNE">Pune</option>
                        </select>
                    </label>


                    {/* Application Types checkboxes */}
                    <label>
                        Apply For:
                        <input
                            type="checkbox"
                            name="CAR"
                            checked={formData.applicationTypes.includes('CAR')}
                            onChange={handleApplicationTypeChange}
                        />
                        Car
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="MOTORCYCLE"
                            checked={formData.applicationTypes.includes('MOTORCYCLE')}
                            onChange={handleApplicationTypeChange}
                        />
                        Motorcycle
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="COMMERCIAL_VEHICLE"
                            checked={formData.applicationTypes.includes('COMMERCIAL_VEHICLE')}
                            onChange={handleApplicationTypeChange}
                        />
                        COMMERCIAL_VEHICLE
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="THREE_WHEELER"
                            checked={formData.applicationTypes.includes('THREE_WHEELER')}
                            onChange={handleApplicationTypeChange}
                        />
                        THREE_WHEELER
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="HEAVY_VEHICLE"
                            checked={formData.applicationTypes.includes('HEAVY_VEHICLE')}
                            onChange={handleApplicationTypeChange}
                        />
                        HEAVY_VEHICLE
                    </label>

                   
                    {/* File upload input for the first file */}
                    <label>
                        Upload Profile Photo:
                        <input
                            type="file"
                            name="files"
                            multiple
                            onChange={(e) => handleFileInputChange(e, 0)}
                        />
                    </label>

                    {/* File upload input for the second file */}
                    <label>
                        Upload Educational Document:
                        <input
                            type="file"
                            name="files"
                            multiple
                            onChange={(e) => handleFileInputChange(e, 1)}
                        />
                    </label>

                    {/* File upload input for the third file */}
                    <label>
                        Upload Address Proof:
                        <input
                            type="file"
                            name="files"
                            multiple
                            onChange={(e) => handleFileInputChange(e, 2)}
                        />
                    </label>


                    <button type="submit" class="primary-button">Submit</button>
                </form>
            {/* </StyledForm> */}

        </div>
    );
};

export default LearnerLicenseApplicationForm;










