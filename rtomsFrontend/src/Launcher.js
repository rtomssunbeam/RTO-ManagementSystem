import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Logo from './components/Logo';
import {Link, Switch, Route} from 'react-router-dom';
import Header from './MajorComponents/Header/Header';
import Footer from './MajorComponents/Footer/Footer';
import Navbar from './MajorComponents/navBar/Navbar';
import HomePage from './MajorComponents/HomePage/HomePage';
import DriversLicense from './DriversLicense';
import Appointment from './Appointment';
import VehicleRegistration from './VehicleRegistration';
import NotFound from "./NotFound";
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import ContactUs from './Pages/ContactUs';
import Services from './Pages/OnlineServices';
import Stepper from './Components/Stepper';
import LearningLicense from './Pages/LearningLicense';
import OtpVerification from './Pages/OtpVerification';


function Launcher() 
{
    return (<div >
                <Header/>
                <Navbar/>
                
                    <Switch>
                       {/* <Route path="/" exact component={Home}/> 
                       <Route path="/home" exact component={Home}/> 
                       <Route path="/Learner-Application" exact component={LearnerApplication}/>
                       <Route path="/Step1" exact component={Step1}/>
                       <Route path="/MCQtest" exact component={MCQComponent}/>
                       <Route path="/pass" exact component={PassComponent} />
                       <Route path="/OwnerRegistration" exact component={OwnerRegForm} />
                       <Route path="/LearnerApplicationsList" exact component={LearnerApplicationsList} />
                       <Route path="/MyApplicationsList" exact component={MyApplicationsList} />
                       <Route path="/UserList" exact component={UserList} />  
                       <Route path="/application/:applicationId" exact component={GetSingleLearnerApplication} />
                       <Route path="/SuccessfullyAproovalOrRejection" exact component={SuccessfullyAproovalOrRejection} />
                       <Route path="/GetListOfOwners" exact component={OwnerList} />
                       <Route path="/VehicleListByOwner/:ownerId" exact component={VehicleListByOwner} /> */}

                    <Route path="/" exact component={HomePage} />
                  <Route path="/home" exact component={HomePage} />
                  <Route path="/drivers-license" exact component={DriversLicense} />
                  <Route path="/Appointment" exact component={Appointment} />
                  <Route path="/vehicle-registration" exact component={VehicleRegistration} />
                  {/* <Route path="*" exact component={NotFound} /> */}
                  <Route path="/Signin" exact component={Signin} />
                  <Route path="/Signup" exact component={Signup} />
                  <Route path="/otp-verification" component={OtpVerification} />
                  <Route path="/ContactUs" exact component={ContactUs} />
                  <Route path="/OnlineServices" exact component={Services} />
                  <Route path="/LearningLicense" exact component={LearningLicense} />
                  <Route path="/Stepper" exact component={Stepper} />
                  {/* <Route path="/Aboutus" exact component={Aboutus} /> */}
                  {/* <Signin />
                  </Route> */}
                  {/* <Route exact path="/Signin">
                    <Signup />
                  </Route> */}
                  {/* <Route path="/Signin" component={Signin} /> */}

                       {/* <Route path="/about" exact component={AboutUs}/> 
                       <ProtectedRoute path="/db" exact 
                                       component={Dashboard}/> 
                       <ProtectedRoute path="/profile" exact 
                                       component={Profile}/> 
                       <Route path="*" exact component={NotFound}/>  */}
                    </Switch>
                <Footer/>
            </div>);
}

export default Launcher;