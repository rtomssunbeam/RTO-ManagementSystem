import React from 'react';
import './LoadingSpinner.css'; // Import CSS for styling the spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
