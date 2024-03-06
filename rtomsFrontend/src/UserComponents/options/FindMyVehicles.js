import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function FindMyVehicles() {
  const { userId } = useParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiclesByOwnerId = async () => {
      try {
        // const response = await fetch(`http://localhost:8080/owner/findMyVehicle?userId=${userId}`);

        const response = await axios.get(`http://localhost:8080/owner/findMyVehicle?userId=${userId}`,{
          headers:{
            "Authorization":`Bearer ${sessionStorage.getItem('authToken')}`
          }
        });
        
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehiclesByOwnerId();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Header>My Vehicles</Card.Header>
      <Card.Body>
        {vehicles.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Vehicle Reg Number</th>
                <th>Model</th>
                <th>Brand</th>
                <th>Power Source</th>
                <th>Type</th>
                <th>colour</th>
                <th>RC Status</th>
                <th>ownership</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle.id}>
                  <td>{index + 1}</td>
                  <td>{vehicle.registrationNumber}</td>
                  <td>{vehicle.modelName}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.powerSource}</td>
                  <td>{vehicle.vehicleType}</td>
                  <td>{vehicle.colour}</td>
                  <td>{vehicle.status}</td>
                  <td>{vehicle.ownership}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No vehicles are currently registered for you.</p>
        )}
      </Card.Body>
    </Card>
  );
}

export default FindMyVehicles;
