import React, { useState, useEffect } from 'react';
import './styles/LearnerApplicationList.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function LearnerApplicationsList() {
  const [learnerApplications, setLearnerApplications] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedApplication, setSelectedApplication] = useState(null); // State to store the selected application


  const history = useHistory();

  useEffect(() => {
    const fetchLearnerApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getAllLearnerApplications?pageNumber=${pageNumber}`, {
          headers: {
            
            "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
          }
        });
        
        // const data = await response.json();
        console.log(response.data);
        setLearnerApplications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLearnerApplications();
  }, []);

  useEffect(() => {
    const fetchLearnerApplications = async () => {
      try {
        //const response = await fetch(`http://localhost:8080/admin/getAllLearnerApplications?pageNumber=${pageNumber}`);

        const response = await axios.get(`http://localhost:8080/admin/getAllLearnerApplications?pageNumber=${pageNumber}`, {
          headers: {
            
            "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
          }
        });

        // const data = await response.json();
        setLearnerApplications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLearnerApplications();
  }, [pageNumber]); // Fetch data whenever the pageNumber changes

  
    const handleViewApplication =(applicationId) => {
        
      console.log(applicationId);
      history.push(`/GetSingleLearnerApplication/${applicationId}`);

      };
    
  

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <Card style={{ minHeight: '500px' }}>
    <Card.Header className="text-center">Learner Applications</Card.Header>
    <Card.Body>
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Application ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>RTO Office</th>
            <th>Status</th> 
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {learnerApplications.map((application, index) => (
            <tr id={application.id}>
              <td>{index + 1}</td>
              <td>{application.id}</td>
              <td>{application.firstName}</td>
              <td>{application.lastName}</td>
              <td>{application.gender}</td>
              <td>{application.rtoOffice}</td>
              <td>{application.status}</td>
              <td>
              <Button onClick={() => handleViewApplication(application.id)} variant="primary">View Application</Button>
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

export default LearnerApplicationsList;
