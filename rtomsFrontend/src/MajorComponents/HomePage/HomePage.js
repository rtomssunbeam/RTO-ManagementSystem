import React from 'react';
import { Link } from 'react-router-dom';
import CarouselComponent from '../carousel/Carousel';
import './Home.css';

const HomePage = () => {
  return (
    <>

      <div className="HomeContainer">
        <div className="HomeCard">
          <img src="https://cdn1.iconfinder.com/data/icons/documents-id-cards-blue-line/64/471_id-card-driver-license-1024.png" alt="Service 1" />
          <h5>LEARNING LICENSE</h5>
          <p>apply for learning license</p>
          <Link to="/LearnerLicenseApplicationForm" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>MORE</Link>
        </div>

        <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/2916/2916170.png" alt="Service 2" />
          <h5>PERMANENT LICENSE</h5>
          <p>apply for permanent license</p>
          <Link to="/PermanentLicenseApplication" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>MORE</Link>
        </div>
        {/* <div className="HomeCard">
          <img src="https://icon-library.com/images/to-do-list-icon/to-do-list-icon-15.jpg" alt="Service 3" />
          <h5>REGISTER OWNER</h5>
          <p>register the owner</p>
          <Link to="/OwnerRegistration" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
        </div> */}
        {/* <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/2554/2554896.png" alt="Service 4" />
          <h5>LEARNER APPLICATION LIST</h5>
          <p>get all learner applications list</p>
          <Link to="/LearnerApplicationsList" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
        </div> */}

        <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/752/752738.png" alt="Service 4" />
          <h5>RULES</h5>
          <p>get info your application</p>
          <Link to="/Rules" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>MORE</Link>
        </div>

        {/* <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/3456/3456426.png" alt="Service 4" />
          <h5>GET All Users</h5>
          <p>get list of all active users</p>
          <Link to="/UserList" className="btn btn-primary" style={{ width: '100%', maxWidth: '70%' }}>APPLY</Link>
        </div> */}

        {/* <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/3456/3456426.png" alt="Service 4" />
          <h5>GET All Owners</h5>
          <p>get info of your vehicle</p>
          <Link to="/GetListOfOwners" className="btn btn-primary" style={{ width: '100%', maxWidth: '70%' }}>APPLY</Link>
        </div> */}

        {/* <div className="HomeCard">
          <img src="https://cdn-icons-png.flaticon.com/512/3456/3456426.png" alt="Service 4" />
          <h5>Register Vehicle</h5>
          <p>get info of your vehicle</p>
          <Link to="/RegisterVehicle" className="btn btn-primary" style={{ width: '100%', maxWidth: '70%' }}>APPLY</Link>
        </div> */}

      </div>
      <div className='HomeContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CarouselComponent />
      </div>
    </>
  );
};

export default HomePage;