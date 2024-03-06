import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './styles/PermananentApplicationsList.css'
import LoadingSpinner from '../ExtraPages/LoadingSpinner'; 

function PermanentApplicationsList() {
  const [permanentLicenseApplications, setPermanentLicenseApplications] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState([]); // State to keep track of disabled buttons
  const history = useHistory();

  useEffect(() => {
    const fetchPermanentLicenseApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/admin/getAllPermanentApplications?pageNumber=${pageNumber}`, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
          }
        });
        const initialDisabledButtons = response.data.map(application => application.status !== 'PENDING');
        setDisabledButtons(initialDisabledButtons);
        setPermanentLicenseApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPermanentLicenseApplications();
  }, [pageNumber]);

  const handleApproveApplication = async (applicationId, index) => {
    setLoading(true);
    console.log(applicationId);
    const response = await axios.put(`http://localhost:8080/permanentLicense/updateStatus`, null, {
      params: {
        permanentAppId: applicationId,
        status: 'APPROVED'
      },
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
      }
    });

    const updatedApplications = [...permanentLicenseApplications];
    updatedApplications[index].status = 'APPROVED';
    setPermanentLicenseApplications(updatedApplications);

    setDisabledButtons((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setLoading(false);
  };

  const handleRejectApplication = async (applicationId, index) => {
    setLoading(true);
    console.log(applicationId);
    const response = await axios.put(`http://localhost:8080/permanentLicense/updateStatus`, null, {
      params: {
        permanentAppId: applicationId,
        status: 'REJECTED'
      },
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
      }
    });

    const updatedApplications = [...permanentLicenseApplications];
    updatedApplications[index].status = 'REJECTED';
    setPermanentLicenseApplications(updatedApplications);

    setDisabledButtons((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
    setLoading(false);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <Card style={{ minHeight: '500px' }}>
      <Card.Header className="text-center">Permanent License Applications</Card.Header>
      <Card.Body>
        <div>
        {loading && <LoadingSpinner />}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Permanent Application ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Slot</th>
                <th>Status</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {permanentLicenseApplications.map((application, index) => (
                <tr key={application.id}>
                  <td>{index + 1}</td>
                  <td>{application.id}</td>
                  <td>{application.firstName}</td>
                  <td>{application.lastName}</td>
                  <td>{application.slotBooking}</td>q
                  <td>{application.status}</td>
                  <td>
                    <Button className="primary-button" onClick={() => handleApproveApplication(application.id, index)} variant="primary" disabled={disabledButtons[index] || application.status !== 'PENDING'}>APPROVE</Button>
                  </td>
                  <td>
                    <Button className="secondary-button" onClick={() => handleRejectApplication(application.id, index)} variant="primary" disabled={disabledButtons[index] || application.status !== 'PENDING'}>REJECT</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <Button onClick={handlePreviousPage} disabled={pageNumber === 0} variant="link">Previous Page</Button>
            <Button onClick={handleNextPage} variant="link" className="ml-2">Next Page</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PermanentApplicationsList;
