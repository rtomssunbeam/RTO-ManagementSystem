import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';

import {
  BrowserRouter as Router, Routes, Route,
  Switch,
  Link,
} from "react-router-dom";

import Header from './MajorComponents/Header/Header';
import Footer from './MajorComponents/Footer/Footer';
import Navbar from './MajorComponents/navBar/Navbar';
import HomePage from './MajorComponents/HomePage/HomePage';

import VehicleRegistration from './DealerComponents/VehicleRegistration';
import NotFound from "./NotFound";
import Signin from './MajorComponents/HomePage/LoginFunctionality/Signin';
import Signup from './MajorComponents/HomePage/LoginFunctionality/Signup';
import ContactUs from './Pages/ContactUs';
import Services from './Pages/OnlineServices';
import Stepper from './Components/Stepper';
import LearningLicense from './Pages/LearningLicense';
import OtpVerification from './MajorComponents/HomePage/LoginFunctionality/OtpVerification';
import LearnerLicenseApplicationForm from './ExtraPages/LearnerLicenseApplicationForm'
import VehicleListByOwner from './AdminComponents/VehicleListByOwner';
import GetListOfOwners from './AdminComponents/GetListOfOwners'
import GetSingleLearnerApplication from './AdminComponents/LearningApplication'
import LearnerApplicationsList from './AdminComponents/LeranerApplications'
import SuccessfullyAproovalOrRejection from './AdminComponents/SuccessfullyAproovalOrRejection';
import UserList from './AdminComponents/UserList'
import AdminDashboard from './AdminComponents/AdminDashboard';
import UserDashboard from './UserComponents/UserDashboard'
import Information from './ExtraPages/Information';
import Terms from './MajorComponents/Footer/Terms'
import FAQ from './MajorComponents/Footer/FAQ'
import Feedback from './MajorComponents/Footer/Feedback'
import Concern from './MajorComponents/Footer/Concern'
import AboutUs from './Pages/AboutUs'
import PermanentLicenseApplication from './UserComponents/PermanentLicenseApplication';
import ProtectedRoute from './ProtectedRout'
import Rules from './MajorComponents/HomePage/Rules'
import MyNavbar from './MajorComponents/navBar/Navbar';
import DealerDash from './DealerComponents/DealerDash';
import MyApplicationsList from './UserComponents/options/GetMyApplications'; 
import GetELearningLicense from './UserComponents/options/GetELearningLicense';
import McqTest from './UserComponents/options/McqTest/McqTest';
import FindMyVehicles from './UserComponents/options/FindMyVehicles';
import VehOwnerRegistrationForm from './DealerComponents/OwnerRegister'
import PermanentApplicationsList from './AdminComponents/PermanentApplicationsList'
import GetVehicleDetails from './DealerComponents/GetVehicleDetails'
import ResultComponent from './UserComponents/options/McqTest/ResultComponent'
import AnnouncementComposePage from './AdminComponents/AnnouncementComposePage';
import LoadingSpinner from './ExtraPages/LoadingSpinner'
import './App.css'



function App() {
  return (
    <>
      <Header />
      <MyNavbar />

      <main className="App-body">
        <div>
          <Switch>
            {/* <Route path="/" exact component={HomePage} />
            <Route path="/home" exact component={HomePage} /> */}
            <ProtectedRoute path="/" exact component={HomePage} />
            <ProtectedRoute path="/home" exact component={HomePage} />

            <ProtectedRoute path="/LearnerLicenseApplicationForm" exact component={LearnerLicenseApplicationForm} />
            <ProtectedRoute path="/MyApplicationsList" exact component={MyApplicationsList} />
            <ProtectedRoute path="/PermanentLicenseApplication" exact component={PermanentLicenseApplication} />
            <ProtectedRoute path="/GetELearningLicense/:applicationId" exact component={GetELearningLicense} />
            <ProtectedRoute path="/McqTest/:applicationId" exact component={McqTest} />
            <ProtectedRoute path="/FindMyVehicles/:userId" exact component={FindMyVehicles} />

            
            <Route path="/GetSingleLearnerApplication/:applicationId" exact component={GetSingleLearnerApplication} />
            <Route path="/PermanentApplicationsList" exact component={PermanentApplicationsList} />
            <Route path="/Rules" exact component={Rules} />
            <Route path="/VehOwnerRegistrationForm" exact component={VehOwnerRegistrationForm} />
            <Route path="/VehicleRegistration" exact component={VehicleRegistration} />
              <Route path="/Signin" exact component={Signin} />
              <Route path="/Signup" exact component={Signup} />

              <Route path="/Signup" exact component={Signup} />
              <Route path="/ResultComponent" exact component={ResultComponent} />

              <Route path="/AnnouncementComposePage" exact component={AnnouncementComposePage} />

              

              <Route path="/LoadingSpinner" exact component={LoadingSpinner} />
            
            <Route path="/vehicle-registration" exact component={VehicleRegistration} />
            
            <Route path="/Signin" exact component={Signin} />
            <Route path="/Signup" exact component={Signup} />
            <Route path="/OtpVerification" component={OtpVerification} />
            <Route path="/ContactUs" exact component={ContactUs} />
            <Route path="/OnlineServices" exact component={Services} />
            <Route path="/LearningLicense" exact component={LearningLicense} />
            
            <Route path="/Stepper" exact component={Stepper} />
            <Route path="/GetVehicleDetails" exact component={GetVehicleDetails} />

            
            
            <Route path="/GetListOfOwners" exact component={GetListOfOwners} />
            <Route path="/VehicleListByOwner/:ownerId" exact component={VehicleListByOwner} />
            
            <Route path="/LearnerApplicationsList" exact component={LearnerApplicationsList} />
            <Route path="/SuccessfullyAproovalOrRejection" exact component={SuccessfullyAproovalOrRejection} />
            <Route path="/UserList" exact component={UserList} />
            
            <Route path="/AdminDashboard" exact component={AdminDashboard} />
            <Route path="/DealerDash" exact component={DealerDash} />

            <Route path="/UserDashboard" exact component={UserDashboard} />
            <Route path="/Information" exact component={Information} />
            <Route path="/Terms" exact component={Terms} />
            <Route path="/FAQ" exact component={FAQ} />
            <Route path="/Feedback" exact component={Feedback} />
            <Route path="/Concern" exact component={Concern} />
            <Route path="/AboutUs" exact component={AboutUs} />
            <Route path="*" exact component={NotFound} />
            
            {/* <Route path="/Aboutus" exact component={Aboutus} /> */}
            {/* <Signin />
                  </Route> */}
            {/* <Route exact path="/Signin">
                    <Signup />
                  </Route> */}
            {/* <Route path="/Signin" component={Signin} /> */}
          </Switch>

        </div>
      </main>

      <Footer />
    </>

  );
}

export default App;


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


//     {/* <div className="container">
//       <div className="box">
//         <Link to="/drivers-license">
//           <img src={learningLogo} className="card-img-top" alt="learning logo" />
//         </Link>
//         <div className="card-body">
//           <h5 className="card-title">Drivers/ Learners License</h5>
//           <p className="card-text">You can apply here for drivers or learners License.</p>
//           <Link to="/drivers-license" className="btn btn-primary">
//             Apply Here
//           </Link>
//         </div>
//       </div>
//       <div className="box">
//         <Link to="/online-test">
//           <img src={feepay} className="card-img-top" alt="learning logo" />
//         </Link>
//         <div className="card-body">
//           <h5 className="card-title">Online Test/ Appointment</h5>
//           <p className="card-text">You can apply here for Online Test/ Appointment.</p>
//           <Link to="/online-test" className="btn btn-primary">
//             Apply Here
//           </Link>
//         </div>
//       </div>
//       <div className="box">
//         <Link to="/vehicle-registration">
//           <img src={ncl} className="card-img-top" alt="learning logo" />
//         </Link>
//         <div className="card-body">
//           <h5 className="card-title">Vehicle Registration</h5>
//           <p className="card-text">You can apply here for Vehicle Registration.</p>
//           <Link to="/vehicle-registration" className="btn btn-primary">
//             Apply Here
//           </Link>
//         </div>
//       </div>
//     </div> */}


//     <Switch>
//       <Route path="/" exact component={HpageCard} />
//       <Route path="/home" exact component={HpageCard} />
//       <Route path="/drivers-license" component={DriversLicense} />
//       <Route path="/online-test" component={OnlineTest} />
//       <Route path="/vehicle-registration" component={VehicleRegistration} />
//       <Route path="*" component={NotFound} exact/>

//     </Switch>




//     {/* <div className="container">
//       <div className="box">
//         <img src={learningLogo} className="card-img-top" alt="learning logo" />
//         <div className="card-body">
//           <h5 className="card-title">Drivers/ Learners License</h5>
//           <p className="card-text">You can apply here for drivers or learners License.</p>
//           <a href="#" className="btn btn-primary">Apply Here</a>
//         </div>
//       </div>
//       <div className="box">
//         <img src={feepay} className="card-img-top" alt="learning logo" />
//         <div className="card-body">
//           <h5 className="card-title">Online Test/ Appointment</h5>
//           <p className="card-text">You can apply here for Online Test/ Appointment.</p>
//           <a href="#" className="btn btn-primary">Apply Here</a>
//         </div>
//       </div>
//       <div className="box">
//         <img src={ncl} className="card-img-top" alt="learning logo" />
//         <div className="card-body">
//           <h5 className="card-title">Vehicle Registration</h5>
//           <p className="card-text">You can apply here for Vehicle Registration.</p>
//           <a href="#" className="btn btn-primary">Apply Here</a>
//         </div>
//       </div>
//     </div> */}


//   </main>
//   <div id="footer">
//     <Footer />
//   </div>
// </div>


