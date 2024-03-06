import React from 'react'
import { Link } from 'react-router-dom';
import '../MajorComponents/HomePage/Home.css';
import CarouselComponent from '../MajorComponents/carousel/Carousel';;

const More = () => {
    return (
        <>

            <div className="HomeContainer">
                <div className="HomeCard">
                    <img src="https://cdn1.iconfinder.com/data/icons/documents-id-cards-blue-line/64/471_id-card-driver-license-1024.png" alt="Service 1" />
                    <h5>User Dashboard</h5>
                    <p>USER</p>
                    <Link to="/UserDashboard" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>
                <div className="HomeCard">
                    <img src="https://cdn1.iconfinder.com/data/icons/documents-id-cards-blue-line/64/471_id-card-driver-license-1024.png" alt="Service 1" />
                    <h5>Admin Dashboard</h5>
                    <p>ADMIN</p>
                    <Link to="/AdminDashboard" className="btn btn-primary" style={{ width: '100%', maxWidth: '100%' }}>APPLY</Link>
                </div>
            </div>

            <div className='HomeContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CarouselComponent />
            </div>
        </>
    );
};

export default More



