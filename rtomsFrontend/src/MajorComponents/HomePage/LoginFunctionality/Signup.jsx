import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// import OtpVerification from './OtpVerification';
// const { Option } = Select;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignupForm = () => {

  // const url = "http://127.0.0.1:8080/emailService/send-otp"
  // const url = "http://192.168.0.115:8080/emailService/send-otp"
  const url = "http://localhost:8080/emailService/send-otp"
  // const url1 = "http://192.168.0.115:8080/emailService/verify-otp"


  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [userDetails, setCredentials] = useState({
    email: "",
    adharcardNo: "",
    firstName: "",
    lastName: "",
    password: "",
  });

 

  const onFinish = async () => {
    try {
     
      setLoading(true);
      console.log(userDetails)
      console.log(userDetails.email.toString())

      const response = await axios.post(url,

        null
        ,
        {
          params: {
            email: userDetails.email
          }
        }
      );
      console.log(response.data.message)
      // Redirect to OTP verification page and pass user details as props
      if (response.data.message === "OTP sent successfully!") {
        history.push({
          pathname: '/OtpVerification',
          state: { user: userDetails },
        });
      }

    } catch (error) {
     console.error('Error sending OTP:', error);
      // Handle error, show a message, etc.
    } finally {
      setLoading(false);
    }
  };

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
           Register Yourself
         </h1>
    <Spin spinning={loading} tip="Sending OTP...">
      <Form
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input name='email' onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="adharcardNo"
          label="Aadhaar Card"
          rules={[
            {
              required: true,
              message: 'Please input your Aadhaar card number!',
            },
          ]}
        >
          <Input name='adharcardNo' onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input name='firstName' onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input name='lastName' onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password name='password' onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Confirm password do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Spin>
    </div></div>
  );
};

export default SignupForm;





// import React, { useState } from 'react';
// import { Form, Input, Button, Checkbox, Spin } from 'antd';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// // import OtpVerification from './OtpVerification';
// // const { Option } = Select;

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

// const Signup = () => {

//   // const url = "http://127.0.0.1:8080/emailService/send-otp"
//   // const url = "http://192.168.0.115:8080/emailService/send-otp"
//   const url = "http://localhost:8080/emailService/send-otp"
//   // const url1 = "http://192.168.0.115:8080/emailService/verify-otp"


//   const history = useHistory();
//   const [loading, setLoading] = useState(false);
//   const [userDetails, setCredentials] = useState({
//     email: "",
//     adharcardNo: "",
//     firstName: "",
//     lastName: "",
//     password: "",
//   });

//   // const onFinish = (values) => {
//   //   console.log('Received values of form: ', values);
//   //    // Redirect to the OTP verification page
//   //    history.push('/otp-verification');
//   // };

//   const onFinish = async () => {
//     try {
//       // Make API request to send OTP and get response
//       setLoading(true);
//       console.log(userDetails)
//       console.log(userDetails.email.toString())

//       const response = await axios.post(url,

//         null
//         ,
//         {
//           params: {
//             email: userDetails.email
//           }
//         }
//       );
//       console.log(response.data.message)
//       // Redirect to OTP verification page and pass user details as props
//       if (response.data.message === "OTP sent successfully!") {
//         history.push({
//           pathname: '/OtpVerification',
//           state: { user: userDetails },
//         });
//       }

//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       // Handle error, show a message, etc.
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <div className='StyledBox' style={{ marginTop: '20px' }}>
//         <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2em', color: 'black' }}>
//           Register Yourself
//         </h1>
//         <Spin spinning={loading} tip="Sending OTP...">
//           <Form
//             onFinish={onFinish}
//             style={{
//               maxWidth: 600,
//             }}
//             scrollToFirstError
//           >

//             <Form.Item
//               name="email"
//               label="E-mail"
//               rules={[
//                 {
//                   type: 'email',
//                   message: 'The input is not a valid E-mail!',
//                 },
//                 {
//                   required: true,
//                   message: 'Please input your E-mail!',
//                 },
//               ]}
//             >
//               <Input name='email' onChange={handleChange} />
//             </Form.Item>

//             <Form.Item
//               name="adharcardNo"
//               label="Aadhaar Card"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your Aadhaar card number!',
//                 },
//               ]}
//             >
//               <Input name='adharcardNo' onChange={handleChange} />
//             </Form.Item>

//             <Form.Item
//               name="firstName"
//               label="First Name"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your first name!',
//                 },
//               ]}
//             >
//               <Input name='firstName' onChange={handleChange} />
//             </Form.Item>

//             <Form.Item
//               name="lastName"
//               label="Last Name"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your last name!',
//                 },
//               ]}
//             >
//               <Input name='lastName' onChange={handleChange} />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your password!',
//                 },
//               ]}
//               hasFeedback
//             >
//               <Input.Password name='password' onChange={handleChange} />
//             </Form.Item>

//             <Form.Item
//               name="confirm"
//               label="Confirm Password"
//               dependencies={['password']}
//               hasFeedback
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please confirm your password!',
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue('password') === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error('Confirm password do not match!'));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>

//             <Form.Item
//               name="agreement"
//               valuePropName="checked"
//               rules={[
//                 {
//                   validator: (_, value) =>
//                     value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
//                 },
//               ]}
//               {...tailFormItemLayout}
//             >
//               <Checkbox>
//                 I have read the <a href="">agreement</a>
//               </Checkbox>
//             </Form.Item>

//             <Form.Item {...tailFormItemLayout}>
//               <Button type="primary" htmlType="submit" disabled={loading}>
//                 Register
//               </Button>
//             </Form.Item>
//           </Form>
//         </Spin>
//       </div>
//     </div>
//   );
// };

// export default Signup;














// import React from 'react';
// import { Form, Input, Button, Checkbox, Select } from 'antd';
// import { useHistory } from 'react-router-dom';
// // const { Option } = Select;

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

// // const SignupForm = () => {
// //   const onFinish = (values) => {
// //     console.log('Received values of form: ', values);
// //   };

// const SignupForm = () => {
//   const history = useHistory();
//   const onFinish = (values) => {
//     console.log('Received values of form: ', values);
//     // Redirect to the OTP verification page
//     history.push('/otp-verification');
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <div className='StyledBox' style={{ marginTop: '20px' }}>
//         <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '2em', color: 'black' }}>
//           Register Yourself
//         </h1>
//         <Form
//           onFinish={onFinish}
//           style={{
//             maxWidth: 600,
//           }}
//           scrollToFirstError
//         >

//           <Form.Item
//             name="email"
//             label="E-mail"
//             rules={[
//               {
//                 type: 'email',
//                 message: 'The input is not a valid E-mail!',
//               },
//               {
//                 required: true,
//                 message: 'Please input your E-mail!',
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="adharcard_no"
//             label="Aadhaar Card"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your Aadhaar card number!',
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="first_name"
//             label="First Name"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your first name!',
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="last_name"
//             label="Last Name"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your last name!',
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your password!',
//               },
//             ]}
//             hasFeedback
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             name="confirm"
//             label="Confirm Password"
//             dependencies={['password']}
//             hasFeedback
//             rules={[
//               {
//                 required: true,
//                 message: 'Please confirm your password!',
//               },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('password') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error('The new password that you entered do not match!'));
//                 },
//               }),
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             name="agreement"
//             valuePropName="checked"
//             rules={[
//               {
//                 validator: (_, value) =>
//                   value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
//               },
//             ]}
//             {...tailFormItemLayout}
//           >
//             <Checkbox>
//               I have read the <a href="">agreement</a>
//             </Checkbox>
//           </Form.Item>

//           <Form.Item {...tailFormItemLayout}>
//             <Button type="primary" htmlType="submit">
//               Register
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;


// // import React from 'react';
// // import { Form, Input, Button, Checkbox, Select } from 'antd';

// // const { Option } = Select;

// // const tailFormItemLayout = {
// //   wrapperCol: {
// //     xs: {
// //       span: 24,
// //       offset: 0,
// //     },
// //     sm: {
// //       span: 16,
// //       offset: 8,
// //     },
// //   },
// // };

// // const SignupForm = () => {
// //   const onFinish = (values) => {
// //     console.log('Received values of form: ', values);
// //   };

// //   return (
// //     <Form
// //       onFinish={onFinish}
// //       style={{
// //         maxWidth: 600,
// //       }}
// //       scrollToFirstError
// //     >

// //       <Form.Item
// //         name="email"
// //         label="E-mail"
// //         rules={[
// //           {
// //             type: 'email',
// //             message: 'The input is not a valid E-mail!',
// //           },
// //           {
// //             required: true,
// //             message: 'Please input your E-mail!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="adharcard_no"
// //         label="Aadhaar Card"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your Aadhaar card number!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="first_name"
// //         label="First Name"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your first name!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="last_name"
// //         label="Last Name"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your last name!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       {/* <Form.Item
// //         name="role"
// //         label="Role"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please select Role!',
// //           },
// //         ]}
// //       >
// //         <Select placeholder="Select your role">
// //           <Option value="Admin">Admin</Option>
// //           <Option value="Dealer">Dealer</Option>
// //           <Option value="User">User</Option>
// //           <Option value="Other">Other</Option>
// //         </Select>
// //       </Form.Item> */}

// //       <Form.Item
// //         name="password"
// //         label="Password"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your password!',
// //           },
// //         ]}
// //         hasFeedback
// //       >
// //         <Input.Password />
// //       </Form.Item>

// //       <Form.Item
// //         name="confirm"
// //         label="Confirm Password"
// //         dependencies={['password']}
// //         hasFeedback
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please confirm your password!',
// //           },
// //           ({ getFieldValue }) => ({
// //             validator(_, value) {
// //               if (!value || getFieldValue('password') === value) {
// //                 return Promise.resolve();
// //               }
// //               return Promise.reject(new Error('The new password that you entered do not match!'));
// //             },
// //           }),
// //         ]}
// //       >
// //         <Input.Password />
// //       </Form.Item>

// //       <Form.Item
// //         name="agreement"
// //         valuePropName="checked"
// //         rules={[
// //           {
// //             validator: (_, value) =>
// //               value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
// //           },
// //         ]}
// //         {...tailFormItemLayout}
// //       >
// //         <Checkbox>
// //           I have read the <a href="">agreement</a>
// //         </Checkbox>
// //       </Form.Item>

// //       <Form.Item {...tailFormItemLayout}>
// //         <Button type="primary" htmlType="submit">
// //           Register
// //         </Button>
// //       </Form.Item>
// //     </Form>
// //   );
// // };

// // export default SignupForm;




// // import React from 'react';
// // import { Form, Input, Button, Checkbox } from 'antd';

// // const tailFormItemLayout = {
// //   wrapperCol: {
// //     xs: {
// //       span: 24,
// //       offset: 0,
// //     },
// //     sm: {
// //       span: 16,
// //       offset: 8,
// //     },
// //   },
// // };

// // const SignupForm = () => {
// //   const onFinish = (values) => {
// //     console.log('Received values of form: ', values);
// //   };

// //   return (
// //     <Form
// //       onFinish={onFinish}
// //       style={{
// //         maxWidth: 600,
// //       }}
// //       scrollToFirstError
// //     >
// //       <Form.Item
// //         name="email"
// //         label="E-mail"
// //         rules={[
// //           {
// //             type: 'email',
// //             message: 'The input is not a valid E-mail!',
// //           },
// //           {
// //             required: true,
// //             message: 'Please input your E-mail!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="first_name"
// //         label="First Name"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your first name!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="last_name"
// //         label="Last Name"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your last name!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="role"
// //         label="Role"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please select Role!',
// //           },
// //         ]}
// //       >
// //         <Select placeholder="select your role">
// //           <Option value="Admin">Male</Option>
// //           <Option value="Dealer">Female</Option>
// //           <Option value="User">Other</Option>
// //           <Option value="Other">Other</Option>
// //         </Select>
// //       </Form.Item>

// //       <Form.Item
// //         name="agreement"
// //         valuePropName="checked"
// //         rules={[
// //           {
// //             validator: (_, value) =>
// //               value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
// //           },
// //         ]}
// //         {...tailFormItemLayout}
// //       >
// //         <Checkbox>
// //           I have read the <a href="">agreement</a>
// //         </Checkbox>
// //       </Form.Item>

// //       <Form.Item {...tailFormItemLayout}>
// //         <Button type="primary" htmlType="submit">
// //           Register
// //         </Button>
// //       </Form.Item>
// //     </Form>
// //   );
// // };

// // export default SignupForm;







// // import React, { useState } from 'react';
// // import {
// //   AutoComplete,
// //   Button,
// //   Cascader,
// //   Checkbox,
// //   Col,
// //   Form,
// //   Input,
// //   InputNumber,
// //   Row,
// //   Select,
// // } from 'antd';

// // const { Option } = Select;
// // const residences = [
// //   {
// //     value: 'zhejiang',
// //     label: 'Zhejiang',
// //     children: [
// //       {
// //         value: 'hangzhou',
// //         label: 'Hangzhou',
// //         children: [
// //           {
// //             value: 'xihu',
// //             label: 'West Lake',
// //           },
// //         ],
// //       },
// //     ],
// //   },
// //   {
// //     value: 'jiangsu',
// //     label: 'Jiangsu',
// //     children: [
// //       {
// //         value: 'nanjing',
// //         label: 'Nanjing',
// //         children: [
// //           {
// //             value: 'zhonghuamen',
// //             label: 'Zhong Hua Men',
// //           },
// //         ],
// //       },
// //     ],
// //   },
// // ];
// // const formItemLayout = {
// //   labelCol: {
// //     xs: {
// //       span: 24,
// //     },
// //     sm: {
// //       span: 8,
// //     },
// //   },
// //   wrapperCol: {
// //     xs: {
// //       span: 24,
// //     },
// //     sm: {
// //       span: 16,
// //     },
// //   },
// // };
// // const tailFormItemLayout = {
// //   wrapperCol: {
// //     xs: {
// //       span: 24,
// //       offset: 0,
// //     },
// //     sm: {
// //       span: 16,
// //       offset: 8,
// //     },
// //   },
// // };
// // const App = () => {
// //   const [form] = Form.useForm();
// //   const onFinish = (values) => {
// //     console.log('Received values of form: ', values);
// //   };
// //   const prefixSelector = (
// //     <Form.Item name="prefix" noStyle>
// //       <Select
// //         style={{
// //           width: 70,
// //         }}
// //       >
// //         <Option value="86">+86</Option>
// //         <Option value="87">+87</Option>
// //       </Select>
// //     </Form.Item>
// //   );
// //   const suffixSelector = (
// //     <Form.Item name="suffix" noStyle>
// //       <Select
// //         style={{
// //           width: 70,
// //         }}
// //       >
// //         <Option value="USD">$</Option>
// //         <Option value="CNY">¥</Option>
// //       </Select>
// //     </Form.Item>
// //   );
// //   const [autoCompleteResult, setAutoCompleteResult] = useState([]);
// //   const onWebsiteChange = (value) => {
// //     if (!value) {
// //       setAutoCompleteResult([]);
// //     } else {
// //       setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
// //     }
// //   };
// //   const websiteOptions = autoCompleteResult.map((website) => ({
// //     label: website,
// //     value: website,
// //   }));
// //   return (
// //     <Form
// //       // {...formItemLayout}
// //       // form={form}
// //       // name="register"
// //       // onFinish={onFinish}
// //       // initialValues={{
// //       //   residence: ['zhejiang', 'hangzhou', 'xihu'],
// //       //   prefix: '86',
// //       // }}
// //       // style={{
// //       //   maxWidth: 600,
// //       // }}
// //       // scrollToFirstError
// //     >
// //       <Form.Item
// //         name="email"
// //         label="E-mail"
// //         rules={[
// //           {
// //             type: 'email',
// //             message: 'The input is not valid E-mail!',
// //           },
// //           {
// //             required: true,
// //             message: 'Please input your E-mail!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       <Form.Item
// //         name="password"
// //         label="Password"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your password!',
// //           },
// //         ]}
// //         hasFeedback
// //       >
// //         <Input.Password />
// //       </Form.Item>

// //       <Form.Item
// //         name="confirm"
// //         label="Confirm Password"
// //         dependencies={['password']}
// //         hasFeedback
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please confirm your password!',
// //           },
// //           ({ getFieldValue }) => ({
// //             validator(_, value) {
// //               if (!value || getFieldValue('password') === value) {
// //                 return Promise.resolve();
// //               }
// //               return Promise.reject(new Error('The new password that you entered do not match!'));
// //             },
// //           }),
// //         ]}
// //       >
// //         <Input.Password />
// //       </Form.Item>

// //       <Form.Item
// //         name="nickname"
// //         label="Nickname"
// //         tooltip="What do you want others to call you?"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your nickname!',
// //             whitespace: true,
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// // <Form.Item
// //   name="gender"
// //   label="Gender"
// //   rules={[
// //     {
// //       required: true,
// //       message: 'Please select gender!',
// //     },
// //   ]}
// // >
// //   <Select placeholder="select your gender">
// //     <Option value="male">Male</Option>
// //     <Option value="female">Female</Option>
// //     <Option value="other">Other</Option>
// //   </Select>
// // </Form.Item>

// //       {/* <Form.Item
// //         name="residence"
// //         label="Habitual Residence"
// //         rules={[
// //           {
// //             type: 'array',
// //             required: true,
// //             message: 'Please select your habitual residence!',
// //           },
// //         ]}
// //       >
// //         <Cascader options={residences} />
// //       </Form.Item> */}

// //       {/* <Form.Item
// //         name="phone"
// //         label="Phone Number"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your phone number!',
// //           },
// //         ]}
// //       >
// //         <Input
// //           addonBefore={prefixSelector}
// //           style={{
// //             width: '100%',
// //           }}
// //         />
// //       </Form.Item> */}

// //       {/* <Form.Item
// //         name="donation"
// //         label="Donation"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input donation amount!',
// //           },
// //         ]}
// //       >
// //         <InputNumber
// //           addonAfter={suffixSelector}
// //           style={{
// //             width: '100%',
// //           }}
// //         />
// //       </Form.Item> */}

// //       {/* <Form.Item
// //         name="website"
// //         label="Website"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input website!',
// //           },
// //         ]}
// //       >
// //         <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
// //           <Input />
// //         </AutoComplete>
// //       </Form.Item> */}

// //       {/* <Form.Item
// //         name="intro"
// //         label="Intro"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input Intro',
// //           },
// //         ]}
// //       >
// //         <Input.TextArea showCount maxLength={100} />
// //       </Form.Item> */}

// //       {/* <Form.Item
// //         name="gender"
// //         label="Gender"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please select gender!',
// //           },
// //         ]}
// //       >
// //         <Select placeholder="select your gender">
// //           <Option value="male">Male</Option>
// //           <Option value="female">Female</Option>
// //           <Option value="other">Other</Option>
// //         </Select>
// //       </Form.Item> */}

// //       {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
// //         <Row gutter={8}>
// //           <Col span={12}>
// //             <Form.Item
// //               name="captcha"
// //               noStyle
// //               rules={[
// //                 {
// //                   required: true,
// //                   message: 'Please input the captcha you got!',
// //                 },
// //               ]}
// //             >
// //               <Input />
// //             </Form.Item>
// //           </Col>
// //           <Col span={12}>
// //             <Button>Get captcha</Button>
// //           </Col>
// //         </Row>
// //       </Form.Item> */}

// //       <Form.Item
// //         name="agreement"
// //         valuePropName="checked"
// //         rules={[
// //           {
// //             validator: (_, value) =>
// //               value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
// //           },
// //         ]}
// //         {...tailFormItemLayout}
// //       >
// //         <Checkbox>
// //           I have read the <a href="">agreement</a>
// //         </Checkbox>
// //       </Form.Item>
// //       <Form.Item {...tailFormItemLayout}>
// //         <Button type="primary" htmlType="submit">
// //           Register
// //         </Button>
// //       </Form.Item>
// //     </Form>
// //   );
// // };
// // export default App;



// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { Button, Checkbox, Form, Input } from 'antd';

// // const Signup = () => {
// //   // Callback when form is successfully submitted
// //   const onFinish = (values) => {
// //     console.log('Success:', values);
// //     // You can add logic here to handle signup (e.g., send data to backend)
// //   };

// //   // Callback when form submission fails
// //   const onFinishFailed = (errorInfo) => {
// //     console.log('Failed:', errorInfo);
// //   };

// //   return (
// //     <Form
// //       name="signup"
// //       labelCol={{
// //         span: 8,
// //       }}
// //       wrapperCol={{
// //         span: 16,
// //       }}
// //       style={{
// //         maxWidth: 600,
// //       }}
// //       initialValues={{
// //         remember: true,
// //       }}
// //       onFinish={onFinish}
// //       onFinishFailed={onFinishFailed}
// //       autoComplete="off"
// //     >
// //       {/* Username field */}
// //       <Form.Item
// //         label="Username"
// //         name="username"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your username!',
// //           },
// //         ]}
// //       >
// //         <Input />
// //       </Form.Item>

// //       {/* Password field */}
// //       <Form.Item
// //         label="Password"
// //         name="password"
// //         rules={[
// //           {
// //             required: true,
// //             message: 'Please input your password!',
// //           },
// //         ]}
// //       >
// //         <Input.Password />
// //       </Form.Item>

// //       {/* Checkbox for "Remember me" (example, you can customize it based on your requirements) */}
// //       <Form.Item
// //         name="remember"
// //         valuePropName="checked"
// //         wrapperCol={{
// //           offset: 8,
// //           span: 16,
// //         }}
// //       >
// //         <Checkbox>Remember me</Checkbox>
// //       </Form.Item>

// //       {/* Submit button */}
// //       <Form.Item
// //         wrapperCol={{
// //           offset: 8,
// //           span: 16,
// //         }}
// //       >
// //         <Button type="primary" htmlType="submit">
// //           Sign Up
// //         </Button>

// //         {/* Link to go back to the sign-in page */}
// //         <Link to="/Signin" style={{ marginLeft: 8 }}>
// //           Already have an account? Sign In
// //         </Link>
// //       </Form.Item>
// //     </Form>
// //   );
// // };

// // export default Signup;


// // import React from 'react'

// // const Signup = () => {
// //   return (
// //     <div>
// //       This Signup Page
// //     </div>
// //   )
// // }

// // export default Signup