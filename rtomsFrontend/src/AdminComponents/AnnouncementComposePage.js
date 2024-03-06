import React, { useState } from 'react';
import axios from 'axios';
import './styles/Announcement.css';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../ExtraPages/LoadingSpinner'; // Import your loading spinner component

function AnnouncementComposePage() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !body) {
      setError('Subject and body are required');
      return;
    }
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:8080/admin/makeAnnouncement', { subject, body },
      {
        headers : {"Authorization": `Bearer ${sessionStorage.getItem("authToken")}`}
      });
      
      console.log('Announcement created:', response.data);
      setIsLoading(false); // Stop loading
      history.push('/SuccessfullyAproovalOrRejection', { message: 'Announcement created successfully', isSuccess: true });
    } catch (error) {
      setIsLoading(false); // Stop loading on error
      console.error('Error creating announcement:', error);
    }
  };

  return (
    <div className="announcement-card">
      {isLoading && <LoadingSpinner />} {/* Show loading spinner if loading */}
      <h2>Compose Announcement</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <table className="announcement-table">
          <tbody>
            <tr>
              <td><label htmlFor="subject">Subject:</label></td>
              <td>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="body">Body:</label></td>
              <td>
                <textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr className="center-button">
              <td colSpan="2" align="center">
                <button className='announcement-button' type="submit" disabled={isLoading}>Create Announcement</button> {/* Disable button while loading */}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AnnouncementComposePage;
