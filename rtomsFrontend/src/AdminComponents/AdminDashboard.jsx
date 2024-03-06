import React from 'react'
import { Link } from 'react-router-dom';
import '../MajorComponents/HomePage/Home.css';
import CarouselComponent from '../MajorComponents/carousel/Carousel';;

const AdminDashboard = () => {
    return (
        <>

            <div className="HomeContainer">

                {/* <div className="HomeCard">
                    <img src="https://icon-library.com/images/to-do-list-icon/to-do-list-icon-15.jpg" alt="Service 3" />
                    <h5>REGISTER OWNER</h5>
                    <p>register the owner</p>
                    <Link to="/OwnerRegistration" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div> */}
                
                <div className="HomeCard">
                    <img src="https://cdn-icons-png.flaticon.com/512/1105/1105891.png" alt="Service 4" />
                    <h5>GET All Users</h5>
                    <p>get list of all active users</p>
                    <Link to="/UserList" className="btn btn-primary" style={{ width: '100%', maxWidth: '70%' }}>APPLY</Link>
                </div>

                <div className="HomeCard">
                    <img src="https://cdn-icons-png.flaticon.com/256/2811/2811227.png" alt="Service 4" />
                    <h5>LEARNER APPLICATION LIST</h5>
                    <p>get all learner applications list</p>
                    <Link to="/LearnerApplicationsList" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>

                <div className="HomeCard">
                    <img src="https://cdn-icons-png.flaticon.com/256/549/549351.png" alt="Service 4" />
                    <h5>PERMANENT APPLICATION LIST</h5>
                    <p>get all permanent applications list</p>
                    <Link to="/PermanentApplicationsList" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>


                <div className="HomeCard">
                    <img src="https://cdn-icons-png.flaticon.com/512/814/814434.png" alt="Service 4" />
                    <h5>GET All Owners</h5>
                    <p>get list of all the owners</p>
                    <Link to="/GetListOfOwners" className="btn btn-primary" style={{ width: '100%', maxWidth: '70%' }}>APPLY</Link>
                </div>

                <div className="HomeCard">
                  <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/search-car-3954426-3272629.png" alt="Service 1" />
                  <h5>FIND VEHICLE</h5>
                  <p>you can find owner by entering the vehicle registration number</p>
                  <Link to="/GetVehicleDetails" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>

                <div className="HomeCard">
                  <img src="https://cdn-icons-png.flaticon.com/512/10751/10751432.png" alt="Service 1" />
                  <h5>ADD DEALER</h5>
                  <p>add deaears who can add vehicles</p>
                  <Link to="/GetVehicleDetails" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>

                <div className="HomeCard">
                  <img src="https://cdn-icons-png.freepik.com/512/6995/6995660.png" alt="Service 1" />
                  <h5>MAILS</h5>
                  <p>check the mail got from users</p>
                  <Link to="/GetVehicleDetails" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>

                <div className="HomeCard">
                  <img src="https://cdn-icons-png.freepik.com/512/2413/2413313.png" alt="Service 1" />
                  <h5>MAKE ANNOUNCEMENT</h5>
                  <p>you can make an announcement to all users</p>
                  <Link to="/AnnouncementComposePage" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>

                

            </div>
            <div className='HomeContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CarouselComponent />
            </div>
        </>
    );
};

export default AdminDashboard



