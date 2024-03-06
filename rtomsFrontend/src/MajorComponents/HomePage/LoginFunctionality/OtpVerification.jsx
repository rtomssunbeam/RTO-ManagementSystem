// OtpVerification.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Spin, Modal } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = () => {

  // const url = "http://192.168.0.115:8080/emailService/verify-otp"
  const url = "http://localhost:8080/emailService/verify-otp"
  // const urlForUser = "http://192.168.0.115:8080/user/signUp"
  const urlForUser = "http://localhost:8080/user/signUp"
  // const urlForResendotp = "http://192.168.0.115:8080/emailService/verify-otp"
  const urlForResendotp = "http://localhost:8080/emailService/resend-otp"

  const history = useHistory();
  const location = useLocation();
  console.log("Location state in OtpVerification:", location.state);

  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(15);
  // useEffect(() => {
  //   // Disable the resend button for 10 seconds when the component mounts
  //   setResendDisabled(true);

  //   const timer = setTimeout(() => {
  //     enableResendButton(); // Enable the resend button after 10 seconds
  //   }, 15000);

  //   return () => clearTimeout(timer);
  // }, []); // Empty dependency array to ensure it only runs on mount

  useEffect(() => {
    // Disable the resend button for 15 seconds when the component mounts
    setResendDisabled(true);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          // Enable the resend button after reaching 0 and clear the interval
          enableResendButton();
          clearInterval(timer);
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array to ensure it only runs on mount


  const enableResendButton = () => {
    setResendDisabled(false);
    // setCountdown(15); // Reset countdown when the button is enabled
  };

  const handleFailure = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error(errorInfo);
  };

  const handleSuccess = (values) => {
    console.log('Success:', values);
    // toast.success('Login successful');
    setResponseMsg(values.msg);
    showModal();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // Redirect to home page after closing the modal
    history.push('/Signin');
  };

  const handleResend = async () => {
    // Implement your logic to resend the OTP
    try {
      // setLoading(true);
      setLoadingResend(true);
      // Disable the resend button and start the timer
      setResendDisabled(true);
      // Make API request to resend OTP
      const resendResponse = await axios.post(urlForResendotp,
        null
        ,
        {
          params: {
            email: location.state.user.email
          }
        }
      );

      if (resendResponse.data.message === "OTP resent successfully!") {
        toast.success(resendResponse.data.message);
        // Set a timer to re-enable the button after 10 seconds
        setCountdown(15);
        const timer = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
              // Enable the resend button after reaching 0 and clear the interval
              enableResendButton();
              clearInterval(timer);
            }
            return prevCountdown - 1;
          });
        }, 1000);
        setTimeout(() => {
          enableResendButton();
        }, 15000);
      } else {
        handleFailure(resendResponse.data.message);
        enableResendButton(); // Enable the button in case of failure
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      handleFailure(error);
      enableResendButton(); // Enable the button in case of an error
    } finally {
      // setLoading(false);
      setLoadingResend(false);
    }
  };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const onFinish = async (values) => {
    const { otp } = values;
    console.log(otp)
    try {
      // setLoading(true);
      setLoadingVerify(true);
      // Make API request to verify OTP
      const response = await axios.post(url,
        null
        ,
        {
          params: {
            email: location.state.user.email,
            enteredOTP: otp
          }


        });
      console.log(response.data)

      // Check if OTP verification was successful
      if (response.data.success) {
        // If successful, send the user details to the backend signup controller
        const response1 = await axios.post(urlForUser, location.state.user);
        console.log(response1.data)
        // Redirect to the login page upon successful signup
        handleSuccess(response1.data);
      } else {
        // Handle unsuccessful OTP verification
        console.error('Error verifying OTP:', response.data.message);
        handleFailure(response.data.message);
        // Show a message, redirect to the OTP verification page again, etc.
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      handleFailure(error);
      // Handle error, show a message, etc.
    } finally {
      // setLoading(false);
      setLoadingVerify(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <div className='StyledBox' style={{ marginTop: '20px' }}>
        
    <Spin spinning={loadingVerify || loadingResend}
      tip={loadingVerify ? "Verifying OTP..." : loadingResend ? "Resending OTP..." : ""}
    >
      <Form
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <h3>Verify OTP Recieved on Your Entered Email</h3>
        <br />
        <br />
        <Form.Item
          name="otp"
          label="Enter OTP"
          rules={[
            {
              required: true,
              message: 'Please input the OTP sent to your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loadingVerify}>
            Verify OTP
          </Button>

          <Button className='m-4' type="default" onClick={handleResend} disabled={resendDisabled || loadingResend}>
            Resend OTP {resendDisabled ? `(${countdown}s)` : ''}
          </Button>
          {/* <Button className='m-4' type="default" onClick={handleResend} disabled={resendDisabledRef.current}>
            Resend OTP
          </Button> */}
        </Form.Item>
      </Form>
      <ToastContainer />
      <Modal
        title="Registered Success"
        open={isModalVisible}
        onOk={handleOk}
      // onCancel={handleCancel}
      >
        <p>{responseMsg}</p>
      </Modal>
    </Spin>
    </div></div>
  );
};

export default OtpVerification;



// // OtpVerification.js
// import React from 'react';
// import { Form, Input, Button, message } from 'antd';
// import { useHistory } from 'react-router-dom';
// import Signin from './Signin';

// const OtpVerification = () => {
//   const history = useHistory();

//   const onFinish = (values) => {
//     // Implement your OTP verification logic here
//     const { otp } = values;

//     // For example, check if the entered OTP is '1234'
//     if (otp === '1234') {
//       message.success('OTP verified successfully!');
//       // Redirect to the login page upon successful OTP verification
//       history.push('/Signin');
//     } else {
//       message.error('Incorrect OTP. Please try again.');
//       // Optionally, you can keep the user on the same page for another attempt
//       // history.push('/otp-verification');
//     }
//   };

//   return (
//     <Form
//       onFinish={onFinish}
//       style={{
//         maxWidth: 600,
//       }}
//     >
//       <Form.Item
//         name="otp"
//         label="Enter OTP"
//         rules={[
//           {
//             required: true,
//             message: 'Please input the OTP sent to your email!',
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Verify OTP
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default OtpVerification;
