import React, { useState, useEffect } from 'react';
import { useParams,useHistory  } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/ELicenseCard.css'
import axios from 'axios';

function GetELearningLicense() {
    // Retrieve the applicationId from the URL
    const { applicationId } = useParams();
    const history = useHistory();
    
    // State to store the application details
    const [applicationDetails, setApplicationDetails] = useState({
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNumber: "",
      userId: null,
      postalAddressDTO: {
        house: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
      },
      gender: "",
      bloodGroup: "",
      dateOfBirth: "",
      rtoOffice: "",
      qualification: "",
      applicationTypes: [],
      result: "",
      status: "" ,
      validTill:""
    });
  
    useEffect(() => {
      const fetchApplicationDetails = async () => {
        try {
          
          const response = await axios.get(`http://localhost:8080/admin/getLearnerApplication?applicationId=${applicationId}`, {
          headers: {
            
            "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
          }
        });

          console.log(response.data);
          setApplicationDetails(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchApplicationDetails();
    }, []);
  
  

    const formatApplicationTypes = () => {
      return applicationDetails.applicationTypes.map(appType => appType.replace('ApplicationType [', '').replace(']', '')).join(', ');
    }

    const handlePrintELicense = () => {
        window.print();
    }

    const handleDownloadELicense = () => {
        // Get the card element
        const cardElement = document.querySelector('.license-card');
    
        // Create a new canvas element
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
    
        // Set canvas dimensions
        canvas.width = cardElement.offsetWidth;
        canvas.height = cardElement.offsetHeight;
    
        // Create an image element
        const image = new Image();
    
        // Create a data URL from the card element
        const svgString = new XMLSerializer().serializeToString(cardElement);
        const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svg);
    
        image.onload = function () {
            context.drawImage(image, 0, 0);
    
            // Convert canvas content to a data URL
            const dataURL = canvas.toDataURL('image/png');
    
            // Create an anchor element
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'e_license.png'; // Set the file name
    
            // Trigger a click event on the anchor element to initiate the download
            downloadLink.click();
        };
    
        image.src = url;
    };
    
    
    
    
  
    return (
        <div className="container">
        <Card className="license-card">
            <Card.Header className="card-header">
                <img src="https://i.pinimg.com/originals/92/14/eb/9214eb8c928dc609928d9a4a79d38aa4.png" alt="Logo" className="logo-image" />
                <h4>E-Learning License</h4>
            </Card.Header>
            <Card.Body>
                <div className="license-details">
                    {/* Render e-learning license details here */}
                    <p><strong>Learning-License No:</strong> {applicationId}</p>
                    <p><strong>Name:</strong> {applicationDetails.firstName + " " + applicationDetails.middleName + " " + applicationDetails.lastName}</p>
                    <p><strong>Gender:</strong> {applicationDetails.gender}</p>
                    <p><strong>DOB:</strong> {applicationDetails.dateOfBirth}</p>
                    <p><strong>Issued By:</strong> {"GOVT OF INDIA"}</p>
                    <p><strong>Validity:</strong><span style={{ color: 'red' }}>{applicationDetails.validTill ? new Date(applicationDetails.validTill).toLocaleDateString() : '---'}</span></p>
                </div>
                {/* <Button variant="success" onClick={handleDownloadELicense}>Download E-License</Button> */}
            </Card.Body>
        </Card>

        <div className="text-center"> {/* Center the last button */}
      <Button variant="primary" onClick={handlePrintELicense}>Print E-Learning License</Button>
    </div>
    </div>
            );
          }
          
 
  export default GetELearningLicense;
  