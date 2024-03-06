import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
function Login() 
{
    const history = useHistory();

    const url = "http://127.0.0.1:9999/login"
    const [credentials, setCredentials] = useState({username: "",
                                                    password: ""})
    const [message, setMessage] = useState("");

    const setMsg = (msg)=>{
        setMessage(msg);
        setTimeout(() => {
                setMessage("");
        }, 2000);
    }
    const OnTextChanged = (args)=>{
        var copyOfCredentials = {...credentials};
        copyOfCredentials[args.target.name] = args.target.value;
        setCredentials(copyOfCredentials);

    }

    const DoLogin = ()=>{
        console.log(credentials);
        axios.post(url, credentials).then((response)=>{
            var replyReceived = response.data;
            if(replyReceived.message==="success")
            {
                var tokenReceived = replyReceived.loginToken;
                window.sessionStorage.setItem("loginToken", tokenReceived);
                history.push("/profile");
            }
            else
            {
                setMsg("Credentials are invalid!");
                setCredentials({username: "",
                                password: ""})
            }
        })
    }
    return (  <center>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <td>User Name</td>
                                <td>
                                    <input type='text'
                                           name="username" 
                                           value={credentials.username}onChange={OnTextChanged}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type='password'
                                           name="password" 
                                           value={credentials.password}onChange={OnTextChanged}/>
                                </td>
                            </tr>
                             <tr>
                                <td></td>
                                <td>
                                   <button className='btn btn-primary' onClick={DoLogin}>Login</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='alert alert-warning'>{message}</div>
                    </div>
              </center>);
}

export default Login;