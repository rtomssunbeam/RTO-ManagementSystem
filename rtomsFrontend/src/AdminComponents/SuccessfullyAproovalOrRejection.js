import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './styles/card.css'

function SuccessfullyAproovalOrRejection() 

{
  const location = useLocation();
  const history = useHistory();
  const message = location.state ? location.state.message : null;
  const isSuccess = location.state ? location.state.isSuccess : false;

  return (



    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card className="RespCard" style={{ width: '20rem' }}>
        <Card.Header>{isSuccess ? 'Success' : 'Error'}</Card.Header>
        <Card.Body>
          {isSuccess ? (
            <>
            <Card.Img 
            variant="top" 
            src="https://clipart-library.com/images_k/success-transparent/success-transparent-3.png" 
            style={{ 
                width: '50%', 
                height: 'auto', 
                borderRadius: '5px', 
                marginBottom: '10px',
                display: 'block', // Ensure it takes up full width
                marginLeft: 'auto', // Center horizontally
                marginRight: 'auto', // Center horizontally
              }} 
            />
            <Card.Text>{message}</Card.Text>
            </>
          ) : (
            <Card.Text>
              {message ? message : 'An error occurred while processing your request. Please try again later.'}
            </Card.Text>
          )}
          <Button variant="primary" onClick={() => history.goBack()}>Go Back</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SuccessfullyAproovalOrRejection;
