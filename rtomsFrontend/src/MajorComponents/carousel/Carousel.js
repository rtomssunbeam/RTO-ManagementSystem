import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';

const CarouselComponent = () => {
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageHeight(img.height);
    };
    img.src = 'https://via.placeholder.com/1300x400'; // Set the source of your image here
  }, []);

  return (
<div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
      <div className="d-flex justify-content-center align-items-center mt-4" style={{ height: imageHeight ? `${imageHeight}px` : '100vh' }}>
        <Carousel className="w-100" style={{ maxWidth: '1300px' }}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1300x400"
              alt="First slide"
              style={{ objectFit: 'cover', width: '1300px', height: '400px' }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/1300x400"
              alt="Second slide"
              style={{ objectFit: 'cover', width: '1300px', height: '400px' }}
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          {/* Add more Carousel.Items as needed */}
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselComponent;
