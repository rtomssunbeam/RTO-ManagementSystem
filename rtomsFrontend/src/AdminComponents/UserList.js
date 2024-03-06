import React, { useState, useEffect } from 'react';
import './styles/LearnerApplicationList.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      
        
        // Make the fetch request with the headers
        try {
          const loginToken = sessionStorage.getItem("Bearer");
      
          const response = await axios.get(`http://localhost:8080/admin/getUsers?pageNumber=${pageNumber}`, {
            headers: {
              Accept: 'application/json',
              "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
            }
          });
      
          setUsers(response.data);
        } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [pageNumber]); // Fetch data whenever the pageNumber changes

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleSendMail = (email) => {
    const subject = encodeURIComponent("Your subject here");
    const body = encodeURIComponent("Your mail content here");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  return (
    <Card style={{ minHeight: '500px' }}>
      <Card.Header>Users</Card.Header>
      <Card.Body>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button onClick={() => handleSendMail(user.email)} variant="link">Send Mail</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="button-container">
          <Button onClick={handlePreviousPage} disabled={pageNumber === 0} variant="secondary">Previous Page</Button>
          <Button onClick={handleNextPage} variant="secondary" className="ml-2">Next Page</Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default UserList;
