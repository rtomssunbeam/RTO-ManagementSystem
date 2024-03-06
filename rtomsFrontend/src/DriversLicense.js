import React from 'react';
// import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';


// import { Switch, Route } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Navbar from './Components/Navbar';
// import MyCarousel from './Components/MyCarousel';


// import HpageCard from './HpageCard';
// import OnlineTest from './OnlineTest';
// import VehicleRegistration from './VehicleRegistration';
// import NotFound from "./NotFound";

function DriversLicense() {
  return (
    <div className="container">

    <div className="box">
      <Link to="/LearningLicense">
        <img src={""} className="card-img-top" alt="learning logo" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">Learning License</h5>
        <p className="card-text">You can apply here for Learning  License.</p>
        <Link to="/LearningLicense" className="btn btn-primary">
          Click Here
        </Link>
      </div>
    </div>

    <div className="box">
      <Link to="/PermanentLicense">
        <img src={""} className="card-img-top" alt="learning logo" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">Permanent License</h5>
        <p className="card-text">You can apply here for Permanent  License.</p>
        <Link to="/PermanentLicense" className="btn btn-primary">
          Click Here
        </Link>
      </div>
    </div>

  </div>

    // <div className="App">
    //   <div id="header">
    //     <Header />
    //   </div>
    //   <div id="navbar">
    //     <Navbar />
    //   </div>
    //   <main className="App-body">
    //     <div id="MyCarousel">
    //       <MyCarousel />
    //     </div>
    //     <div>
    //       <Switch>
    //         <Route path="*" component={NotFound} exact />
    //       </Switch>
    //     </div>
    //   </main>
    //   <div id="footer" className="footer">
    //     <Footer />
    //   </div>
    // </div>
  );
};

export default DriversLicense;
