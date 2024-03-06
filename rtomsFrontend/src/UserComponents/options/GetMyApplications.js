import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/getMyApplications.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

function MyApplicationsList() {

  const history = useHistory();

  const [userApplications, setUserApplications] = useState([]);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    // Retrieve user ID from session storage
    const token = sessionStorage.getItem('authToken');
   
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log("my user id :"+decodedToken.userId);
      setUserId(parseInt(decodedToken.userId));
    }
  }, []);

  useEffect(() => {
    const fetchUserApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/getMyApplications?userId=${userId}`, {
          headers: {
            
            "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
          }
        });

       
        setUserApplications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserApplications();
  }, [userId]); // Fetch data whenever the userId changes


  const handleGetELicenseClick  =(applicationId,applicationName,applicationStatus) => {
        
    console.log(applicationId+" "+applicationName);
    if(applicationName==='Learner License' && applicationStatus==='APPROVED'){history.push(`/GetELearningLicense/${applicationId}`);}
    else if (applicationName==='Permanent License'&& applicationStatus==='APPROVED'){console.log("parmenent")}
    else {console.log("it is still pending")}
    

  }

  return (
    <Card style={{ minHeight: '500px' }}>
      <Card.Header>My Applications</Card.Header>
      <Card.Body>
        {userApplications.length === 0 ? (
          <p>You haven't made any applications yet.</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Application Type</th>
                  <th>Status</th>
                  <th>Valid Till</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userApplications.map((application, index) => (
                  <tr key={application.id}>
                    <td>{index + 1}</td>
                    <td>{application.name}</td>
                    <td>{application.status}</td>
                    <td>{application.validTill ? new Date(application.validTill).toLocaleDateString() : '---'}</td>

                    <td>
                      <Button variant="primary" onClick={() => handleGetELicenseClick(application.id,application.name,application.status)}>Get E-License</Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default MyApplicationsList;
