import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Modal,Spin } from 'antd';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Import the named export jwtDecode instead of the default export
import { useAuth } from '../../../AuthContext'; // Import the useAuth hook
import './SignIn.css';

const StyledBox = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
`;

const StyledForm = styled(Form)`
  label {
    font-weight: bold;
  }

  .ant-btn-primary {
    margin-right: 8px;
  }

  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  margin-left: 8px;
`;

const Signin = () => {
    
    const url = "http://localhost:8080/user/signIn";
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const[msg,setMsg]=useState("");

    const { isLoggedIn, handleLogin } = useAuth();

    const [responseMsg, setResponseMsg] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSuccess = (values) => {
        console.log('Success:', values);
        setResponseMsg("Logged In Successfully !!!");
        sessionStorage.setItem('authToken', values.jwt);
        showModal();
        handleLogin();
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        history.push("/");
    };

    const handleFailure = (errorInfo) => {
        console.log('Failed:', errorInfo);
        toast.error('Email or Password is incorrect');
    };

    const handleFormSubmit = async () => {
        try {
            setLoading(true);
            // Make a POST request using Axios
            const response = await axios.post(url, credentials);
            console.log(response.data)
            if(response.data.jwt){
            // Handle success
            handleSuccess(response.data);

            // Assuming your response contains a login token and you want to redirect
            const tokenReceived = response.data.jwt;
            setMsg(response.data.mesg);
            // const tokenReceived=sessionStorage.getItem('loginToken');
            if (tokenReceived) {
                // window.sessionStorage.setItem("loginToken", tokenReceived);
                const decodedToken = jwtDecode(tokenReceived);

                const username = decodedToken.username;
                const role = decodedToken.role;

                console.log("Username:", username);
                console.log("Role:", role);

                if (role === "ROLE_USER") {
                    history.push("/UserDashboard"); // Redirect to user dashboard route
                } else if (role === "ROLE_ADMIN") {
                    history.push("/AdminDashboard"); // Redirect to admin dashboard route
                } 
                else if (role === "ROLE_DEALER") {
                    history.push("/DealerDash"); // Redirect to admin dashboard route
                }
                else {
                    console.error("Unknown role:", role); // Handle unknown roles
                }
                


            }}
            else{
                handleFailure(response.data.msg);
            }
            // history.push("/");
        } catch (error) {
            // Handle error
            handleFailure(error);
        } finally {
            setLoading(false);
        }
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setCredentials((prevData)=>({...prevData,[name]:value,}));
    //         // { ...credentials, [name]: value });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div className='StyledBox' style={{ marginTop: '20px' }}>
         <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2em', color: 'black' }}>
           SignIn Here
         </h1>
        <Spin spinning={loading} tip="Signing In...">
            <StyledBox>
                <StyledForm
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleFormSubmit}
                    onFinishFailed={handleFailure}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username(i.e. email)!',
                            },
                        ]}
                    >
                        <Input name='email' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password name='password' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" disabled={loading}>
                            Submit
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        Don't have an account?
                        <StyledLink to="/Signup">SignUp</StyledLink>
                    </Form.Item>
                </StyledForm>

                <ToastContainer />
                <Modal
                    title="Login Success"
                    open={isModalVisible}
                    onOk={handleOk}
                    // onCancel={handleCancel}
                >
                    <p>{responseMsg}</p>
                </Modal>
            </StyledBox>
        </Spin>
        </div>
        </div>
    );

};

export default Signin;