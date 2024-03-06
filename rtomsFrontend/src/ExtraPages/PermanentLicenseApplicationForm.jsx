import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'antd';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  label {
    font-weight: bold;
    margin-bottom: 8px;
    display: block;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .ant-btn-primary {
    margin-right: 8px;
  }

  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
`;

const StyledBox = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const PermanentLicenseApplicationForm = () => {
  const url = "http://127.0.0.1:8080/permanentLicense/application";

  const [formData, setFormData] = useState({
    learningLicenseNumber: '',
    preferredDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, formData, {
                
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`

        }
    });

      console.log('Server response:', response.data);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  };

  // Calculate the date for 14 days from today
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 13);

  return (
    <StyledBox>
      <StyledForm
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <form onSubmit={handleSubmit}>
          <label>
            Learning License Number:
            <input
              type="text"
              name="learningLicenseNumber"
              value={formData.learningLicenseNumber}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Preferred Date:
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]} // Set minimum date to today
              max={maxDate.toISOString().split('T')[0]} // Set maximum date to 14 days from today
              required
            />
          </label>

          <button type="submit">Submit</button>
        </form>
      </StyledForm>
    </StyledBox>
  );
};

export default PermanentLicenseApplicationForm;


