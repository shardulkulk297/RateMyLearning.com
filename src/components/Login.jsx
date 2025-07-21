import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const removeToken = () => {
            localStorage.clear();
        }
        removeToken();
    }, [])

    const loginUser = async () => {
        try {
            //Encoding the credentials
            let encodedString = window.btoa(username + ":" + password);
            //Creating token and signing in using basic Http Security
            const response = await axios.get("http://localhost:8080/api/user/getToken", {
                headers: { "Authorization": "Basic " + encodedString }
            })
            console.log(response.data);
            let token = response.data;
            
            //Getting user details
            if (token) {
                localStorage.setItem('token', token);
                const details = await axios.get("http://localhost:8080/api/user/getLoggedInUserDetails", {
                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                })
                console.log(details);
                const role = details.data.userDto.role;


                if (role === "REVIEWER") {
                    navigate("/reviewer");
                }

            }

        } catch (error) {
            console.log(error);
            toast.error("Bad Credentials")
        }
    }

    return (
        <div className='container py-5'>
            <h1>Rate My Learning</h1>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-auto'>
                    <div className='card shadow-sm' style={{ width: "30rem" }}>
                        <div className='card-header'>
                            <strong>Login</strong>
                        </div>
                        <div className='card-body'>

                            <div className='mb-4'>
                                <input value={username} type="text" className='form-control' placeholder='Enter Name' onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <input value={password} type="password" className='form-control' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className='mb-4 d-flex justify-content-center align-items-center'>
                                <button onClick={loginUser} className='btn btn-primary'>Sign In</button>
                            </div>

                            <div>
                                <p>Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login