import { Route,Redirect } from "react-router-dom";
import userDashboard from "./UserComponents/UserDashboard";
import Signin from "./MajorComponents/HomePage/LoginFunctionality/Signin";
import LearnerLicenseApplicationForm from "./ExtraPages/LearnerLicenseApplicationForm";
import PermanentLicense from "./Pages/PermanentLicense";
import MyApplicationsList from "./UserComponents/options/GetMyApplications";
import NotFound from "./NotFound";
import { jwtDecode } from "jwt-decode";
import UserDashboard from "./UserComponents/UserDashboard";
import GetELearningLicense from "./UserComponents/options/GetELearningLicense";
import McqTest from "./UserComponents/options/McqTest/McqTest";
import FindMyVehicles from "./UserComponents/options/FindMyVehicles";
import PermanentLicenseApplication from "./UserComponents/PermanentLicenseApplication"
import HomePage from "./MajorComponents/HomePage/HomePage";
import AdminDashboard from "./AdminComponents/AdminDashboard";
import DealerDash from "./DealerComponents/DealerDash";

function ProtectedRoute(props) 
{


    var token = window.sessionStorage.getItem("authToken")
    if(token!=null)
    {
        const decodedToken = jwtDecode(token);
        if ( decodedToken.role === "ROLE_USER") {
            return (
              <Route path={props.path} exact={props.exact}>
                {props.path === "/LearnerLicenseApplicationForm" ? (
                  <LearnerLicenseApplicationForm />
                ) : props.path === "/PermanentLicenseApplication" ? (
                  <PermanentLicenseApplication />
                ): props.path === "/MyApplicationsList" ? (
                  <MyApplicationsList />
                ): props.path === "/McqTest/:applicationId" ? (
                  <McqTest />
                ) : props.path === "/GetELearningLicense/:applicationId" ? (
                  <GetELearningLicense />
                ): props.path === "/GetEPermanentLicense/:applicationId" ? (
                  <GetELearningLicense />
                ): props.path === "/FindMyVehicles/:userId" ? (
                  <FindMyVehicles />
                ): props.path === "/" ? (
                  <UserDashboard />
                )
                : (
                  <NotFound />
                )}
              </Route>
            );
          } 
        
        else if (decodedToken.role === "ROLE_ADMIN")
        {
          return(
            <Route path={props.path} exact={props.exact}>
            {props.path === "/" ? (
              <AdminDashboard />
            ) 
            : (
              <NotFound />
            )}
          </Route>
          
          );
        }

        else if (decodedToken.role === "ROLE_DEALER")
        {
          return(
            <Route path={props.path} exact={props.exact}>
            {props.path === "/" ? (
              <DealerDash />
            ) 
            : (
              <NotFound />
            )}
          </Route>
          
          );
        }
    }
    else {

      if(props.path === "/" || props.path==="/home")
      {
        return(
         <HomePage/>) ;
      }
        return(
        <Redirect to="/signin" />) ;
      }
    
    
    
}

    


export default ProtectedRoute;