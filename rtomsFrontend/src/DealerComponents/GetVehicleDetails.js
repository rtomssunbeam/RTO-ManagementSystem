import React, { useState } from 'react';
import axios from 'axios';
import './styles/VehicleDetails.css'; // Import CSS file for styling

function GetVehicleDetails() {
    const [regNo, setRegNo] = useState('');
    const [vehicleDetails, setVehicleDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/admin/getVehicleInfo/${regNo}`,{
                headers: {
            
                    "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
                  }
            });
            if (!response.data) {
                setError(null);
                setVehicleDetails(null);
                return; // Exit the function if response data is null
            }
            setVehicleDetails(response.data);
            setError(null);
        } catch (error) {
            setError(error.response.data.message);
            setVehicleDetails(null);
        }
    };

    return (
        <div className="vehicle-details-container">
            <h2>Search Vehicle</h2>
            <div className="search-container">
                <input
                    type="text"
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="Enter vehicle registration number"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="cardVehDetails">
                {vehicleDetails === null && !error && (
                    <div className="card-content">
                        <h2>No Vehicle Found</h2>
                    </div>
                )}

                {error && (
                    <div className="cardVehDetails-content">
                        <h2>Error</h2>
                        <p>{error}</p>
                    </div>
                )}

                {vehicleDetails && (
                    <div className="cardVehDetails-content">
                        <h2>Vehicle Details</h2>
                        <p>Model Name: {vehicleDetails.modelName}</p>
                        <p>Brand: {vehicleDetails.brand}</p>
                        <p>Colour: {vehicleDetails.colour}</p>
                        <p>Chassis Number: {vehicleDetails.chassisNumber}</p>
                        <p>Registration Number: {vehicleDetails.registrationNumber}</p>
                        <p>Ownership: {vehicleDetails.ownership}</p>
                        <p>Date of Manufacture: {vehicleDetails.dateOfManufacture}</p>
                        <p>Registration Date: {vehicleDetails.registrationDate}</p>
                        <p>Vehicle Type: {vehicleDetails.vehicleType}</p>
                        <p>Power Source: {vehicleDetails.powerSource}</p>
                        <p>Status: {vehicleDetails.status}</p>
                        <p>Adhar Number: {vehicleDetails.adharNo || 'N/A'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GetVehicleDetails;
