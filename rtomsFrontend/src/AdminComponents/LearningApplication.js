import React, { useState, useEffect } from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './styles/LearnerApplicationDetails.css'; // Import custom CSS file
import axios from 'axios';
import LoadingSpinner from '../ExtraPages/LoadingSpinner'; // Import the LoadingSpinner component

function GetSingleLearnerApplication() {
    // Retrieve the applicationId from the URL
    const { applicationId } = useParams();
    const history = useHistory();
    
    const [loading, setLoading] = useState(false); // State to manage loading animation

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
      status: "" 
    });
  
    const [selectedDocument, setSelectedDocument] = useState(null);
  
    useEffect(() => {
      const fetchApplicationDetails = async () => {
        try {
          setLoading(true); // Set loading to true when fetching data
          const response = await axios.get(`http://localhost:8080/admin/getLearnerApplication?applicationId=${applicationId}`,{
            headers:{
              'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`
            }
          })
          setApplicationDetails(response.data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error(error);
          setLoading(false); // Set loading to false if there's an error
        }
      };
  
      fetchApplicationDetails();
    }, []);
  
    const handleDownload = () => {
      // Make GET request to the server to download the image
      if (selectedDocument) {
        setLoading(true); // Set loading to true when fetching data
        axios.get(`http://localhost:8080/admin/getDocuments?applicationId=${applicationId}&name=${selectedDocument}`,{
          responseType: 'blob',
          headers:{ 
            'Authorization' : `Bearer ${sessionStorage.getItem('authToken')}`
          }
        })
          .then(response => {
            // Create a temporary link element to trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${selectedDocument}.jpg`); // Set the filename
            link.setAttribute('target', '_blank'); // Open in a new tab
            document.body.appendChild(link);
            link.click();
            // Clean up
            link.parentNode.removeChild(link);
            setLoading(false); // Set loading to false after data is fetched
          })
          .catch(error => {
            console.error('Error downloading image:', error);
            setLoading(false); // Set loading to false if there's an error
          });
      }
    };
  
    const handleApproval = () => {
      setLoading(true); // Set loading to true when sending request
      axios.put(`http://localhost:8080/admin/learnerApplication/updateStatus?LearnerAppId=${applicationId}&status=APPROVED`, null, {
          headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
          }
      })
          .then(response => {
              setLoading(false); // Set loading to false when response is received
              // Check if the response is successful
              if (response.status === 200) {
                  // Navigate to the SuccessfullyAproovalOrRejection component with success status and message
                  history.push({
                      pathname: '/SuccessfullyAproovalOrRejection',
                      state: { isSuccess: true, message: response.data.msg }
                  });
              } else {
                  throw new Error('Failed to approve application');
              }
          })
          .catch(error => {
              console.error('Error approving application:', error);
              setLoading(false); // Set loading to false if there's an error
          });
  };

  const handleRejection = () => {
      setLoading(true); // Set loading to true when sending request
      axios.put(`http://localhost:8080/admin/learnerApplication/updateStatus?LearnerAppId=${applicationId}&status=REJECTED`, null, {
          headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`
          }
      })
          .then(response => {
              setLoading(false); // Set loading to false when response is received
              // Check if the response is successful
              if (response.status === 200) {
                  // Navigate to the SuccessfullyAproovalOrRejection component with success status and message
                  history.push({
                      pathname: '/SuccessfullyAproovalOrRejection',
                      state: { isSuccess: true, message: response.data.msg }
                  });
              } else {
                  throw new Error('Failed to reject application');
              }
          })
          .catch(error => {
              console.error('Error rejecting application:', error);
              setLoading(false); // Set loading to false if there's an error
          });
  };
    
    // Function to format application types
    const formatApplicationTypes = () => {
      return applicationDetails.applicationTypes.map(appType => appType.replace('ApplicationType [', '').replace(']', '')).join(', ');
    }
    return (
      <div className="container">
        {loading && <LoadingSpinner />}
        <Card className="custom-card">
          <Card.Header className="card-header"><h4>Application Details</h4></Card.Header>
          <Card.Body>
            <table className="table table-responsive">
              <thead > {/* Center the header */}
                <tr>
                  <th className="text-center">Personal Details</th>
                  <th className="text-center">Address Details</th>
                  <th className="text-center">Other Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p><strong>First Name:</strong> {applicationDetails.firstName}</p>
                    <p><strong>Middle Name:</strong> {applicationDetails.middleName}</p>
                    <p><strong>Last Name:</strong> {applicationDetails.lastName}</p>
                    <p><strong>Blood Group:</strong> {applicationDetails.bloodGroup}</p>
                    <p><strong>Date of Birth:</strong> {applicationDetails.dateOfBirth}</p>
                    <p><strong>Mobile Number:</strong> {applicationDetails.mobileNumber}</p>
                  </td>
                  <td>
                    <p><strong>House:</strong> {applicationDetails.postalAddressDTO.house}</p>
                    <p><strong>Street:</strong> {applicationDetails.postalAddressDTO.street}</p>
                    <p><strong>City:</strong> {applicationDetails.postalAddressDTO.city}</p>
                    <p><strong>State:</strong> {applicationDetails.postalAddressDTO.state}</p>
                    <p><strong>Country:</strong> {applicationDetails.postalAddressDTO.country}</p>
                    <p><strong>Zip Code:</strong> {applicationDetails.postalAddressDTO.zipCode}</p>
                  </td>
                  <td>
                    <p><strong>Qualification:</strong> {applicationDetails.qualification}</p>
                    <p><strong>Application Types:</strong> {formatApplicationTypes()}</p>
                    <p><strong>Result:</strong> {applicationDetails.result}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row mt-3 align-items-center">
              {/* Left column containing the approve and reject buttons */}
              <div className="col-md-8">
              {applicationDetails.result === 'PASS' && applicationDetails.status === 'PENDING' && (
                  <>
                    <Button variant="success" className="mr-2" onClick={handleApproval} disabled={applicationDetails.status !== 'PENDING'}>
                      Approve
                    </Button>
                    <Button variant="danger" onClick={handleRejection} disabled={applicationDetails.status !== 'PENDING'}>
                      Reject
                    </Button>
                  </>
                )}
              </div>
  
              {/* Right column containing the dropdown and the download button */}
              <div className="col-md-4 d-flex justify-content-end">
                {/* Dropdown to select document */}
                <DropdownButton id="dropdown-basic-button" title={selectedDocument || 'Select Document'} className="mr-2">
                  <Dropdown.Item onClick={() => setSelectedDocument('PROFILE_PICTURE')}>
                    Profile-Picture
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedDocument('ADDRESS_PROOF')}>
                    Address-Proof
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedDocument('EDUCATIONAL_DOC')}>
                    Qualification-Doc
                  </Dropdown.Item>
                  {/* Add more dropdown items as needed */}
                </DropdownButton>
                
                {/* Button to trigger download */}
                <Button onClick={handleDownload} disabled={!selectedDocument}>
                  Download
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <hr/>
      </div>
    );
  }
  
  export default GetSingleLearnerApplication;
  