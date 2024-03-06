import React, { useState } from 'react';
import { Modal } from 'antd';
import {useHistory} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import userDashboard from './UserDashboard'

const PermanentLicenseApplication = () => {
  const url = "http://127.0.0.1:8080/admin/getLearnerApplicationDetails/"
  const urlForSlot = "http://127.0.0.1:8080/permanentLicense/application"
  const [learnerId, setLearnerId] = useState('');
  const [error, setError] = useState('');
  const [learnerDetails, setLearnerDetails] = useState(null);
  const history = useHistory();

  const handleLearnerIdChange = (e) => {
    setLearnerId(e.target.value);
  };
  const [responseMsg, setResponseMsg] = useState(null);
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    userId: '',
    learnerApplicationId: '',
    slotBooking: ''
  });

  const handleSuccess = (values) => {
    console.log('Success:', values);
    // toast.success('Login successful');
    setResponseMsg(values.msg);
    // sessionStorage.setItem('loginToken', values.msg);
    showModal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Redirect to home page after closing the modal
    history.push("/userDashboard");
  };

  // const handleCancel = () => {
  //     setIsModalVisible(false);
  // };


  const handleFailure = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error(errorInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitBooking = async () => {
    try {
      setFormData((prevData) => ({
        ...prevData,
        learnerApplicationId: learnerDetails.id,
        userId: learnerDetails.userId,
      }));
      // Send a request to another URL with learningLicenseNumber and preferredDate
      const bookingResponse = await axios.post(urlForSlot, formData,{
        headers: {
          'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
      }
      });
      // Handle the booking response as needed
      console.log("Booking response:", bookingResponse.data);
      if (bookingResponse.data) {
        // Handle success
        handleSuccess(bookingResponse.data);
      }
      else {
        handleFailure(bookingResponse.data);
      }

    } catch (error) {
      console.error('Booking Error:', error);
      // Handle booking error
      toast.error('Something went wrong on server');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.get(url + `${learnerId}`,{
        headers: {
          'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
      }
      });
      
      console.log(response.data);
      if (response.data) {
        setLearnerDetails(response.data); // Set learner details in state
        setError(''); // Clear any previous error
        // Redirect to the next component passing learner ID as prop
        // For example: history.push('/next-component', { learnerId: learnerId });
      } else {
        setLearnerDetails(null); // Reset learner details if not found
        setError('Learner ID not found. Please enter a valid ID.');
      }
    } catch (error) {
      console.error('Error:', error);
      setLearnerDetails(null); // Reset learner details on error
      setError('An error occurred. Please try again.');
    }
  };
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 13);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Permanent License Application</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="learnerId">Learner ID:</label>
            <input
              type="text"
              className="form-control"
              id="learnerId"
              value={learnerId}
              onChange={handleLearnerIdChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        {learnerDetails && (
          <div>
            <h2>Learner Details:</h2>
            <p>First Name: {learnerDetails.firstName}</p>
            <p>Middle Name: {learnerDetails.middleName}</p>
            <p>Last Name: {learnerDetails.lastName}</p>
            <p>Mobile Number: {learnerDetails.mobileNumber}</p>
            <p>Gender: {learnerDetails.gender}</p>
            <p>Blood Group: {learnerDetails.bloodGroup}</p>
            <p>Date of Birth: {learnerDetails.dateOfBirth}</p>
            <p>RTO Office: {learnerDetails.rtoOffice}</p>
            <p>Qualification: {learnerDetails.qualification}</p>
            <p>Application Types: {learnerDetails.applicationTypes.join(' , ')}</p>
            <p>Status: {learnerDetails.status}</p>
            {/* {learnerDetails.result && <p>Result: {learnerDetails.result}</p>}
            {learnerDetails.validTill && <p>Valid Till: {learnerDetails.validTill}</p>} */}

            <h3>Postal Address:</h3>
            <p>House: {learnerDetails.postalAddressDTO.house}</p>
            <p>Street: {learnerDetails.postalAddressDTO.street}</p>
            <p>City: {learnerDetails.postalAddressDTO.city}</p>
            <p>State: {learnerDetails.postalAddressDTO.state}</p>
            <p>Country: {learnerDetails.postalAddressDTO.country}</p>
            <p>Zip Code: {learnerDetails.postalAddressDTO.zipCode}</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {learnerDetails?.status === 'APPROVED' && (
          <div>
            <br />
            <br />
            <label>
              Slot Booking Date:
              <input
                type="date"
                name="slotBooking"
                value={formData.slotBooking}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]} // Set minimum date to today
                max={maxDate.toISOString().split('T')[0]} // Set maximum date to 14 days from today
                required
              />
            </label>
            <br />
            <br />
            <label>
              Learning License Number:
              <input
                type="text"
                name="learnerApplicationId"
                defaultValue={learnerDetails.id}
                onChange={handleInputChange}
                required
                disabled />
            </label>
            <br />
            <br />
            <label>
              User Id:
              <input
                type="text"
                name="userId"
                defaultValue={learnerDetails.userId}
                onChange={handleInputChange}
                required
                disabled />
            </label>
            <br />
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitBooking}
            >
              Book Slot
            </button>
          </div>
        )}
        <ToastContainer />
        <Modal
          title="Login Success"
          open={isModalVisible}
          onOk={handleOk}
        // onCancel={handleCancel}
        >
          <p>{responseMsg}</p>
        </Modal>
      </div>
    </div>
  );
};

export default PermanentLicenseApplication;