import React from 'react'
import { Link } from 'react-router-dom';
import '../MajorComponents/HomePage/Home.css';
import CarouselComponent from '../MajorComponents/carousel/Carousel';
import { jwtDecode } from "jwt-decode";

const UserDashboard = () => {

  var userId;
  var token = window.sessionStorage.getItem("authToken")
  if(token!=null)
    {
        const decodedToken = jwtDecode(token);
        userId=decodedToken.userId;
    }
  return (
    <>

      <div className="HomeContainer">
        <div className="HomeCard">
          <img src="https://cdn1.iconfinder.com/data/icons/documents-id-cards-blue-line/64/471_id-card-driver-license-1024.png" alt="Service 1" />
          <h5>LEARNING LICENSE</h5>
          <p>apply for learning license</p>
          <Link to="/LearnerLicenseApplicationForm" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
        </div>

        <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/2916/2916170.png" alt="Service 2" />
          <h5>PERMANENT LICENSE</h5>
          <p>apply for permanent license</p>
          <Link to="/PermanentLicenseApplication" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
        </div>
        
        <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/256/6159/6159644.png" alt="Service 4" />
          <h5>GET MY APPLICATIONS</h5>
          <p>get info your application</p>
          <Link to="/MyApplicationsList" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
        </div>

        

        <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/752/752738.png" alt="Service 4" />
          <h5>RULES</h5>
          <p>get info your application</p>
          <Link to="/Rules" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
        </div>

        <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/3410/3410318.png" alt="Service 4" />
          <h5>FIND MY VEHICLE</h5>
          <p>get info your application</p>
          <Link to={`/FindMyVehicles/${userId}`} className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>      
       </div>

       <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/256/6002/6002902.png" alt="Service 4" />
          <h5>HELP</h5>
          <p>get in touch to our assistant for any help if needed</p>
          <Link to="/Rules" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
        </div>

      </div>

      

      
      <div className='HomeContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CarouselComponent />
      </div>
    </>
  );
};

export default UserDashboard



