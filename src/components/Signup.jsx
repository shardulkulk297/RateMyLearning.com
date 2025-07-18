import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [bio, setBio] = useState("");

    const signUpUser = async()=>{

        try {
            const response = await axios.post("http://localhost:8080/api/reviewer/add",{
                
                'user':{
                    'username': username,
                    'password': password 
                },
                'name': name,
                'email': email,
                'contact': contact,
                'bio': bio 
            });
            console.log(response.data);
            toast.success("SignUp Successful!!");
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className='container py-5'>
            <h1 className='p-1'>Sign up to Rate My Learning</h1>
            <div className='row d-flex justify-content-center align-items-center' style={{minHeight: "100vh"}}>
                <div className='col-md-auto'>
                    <div className='card shadow-sm' style={{ width: "40rem" }}>
                        <div className='card-header'>
                            SignUp
                        </div>
                        <div className='card-body'>
                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Contact' onChange={e => setContact(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <textArea className="form-control" placeholder="Enter Your bio" onChange={e=>setBio(e.target.value)}></textArea>

                            </div>
                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Contact number' onChange={e => setContact(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="" className='form-label'>Upload your profile pic</label>
                                <input type="file" className='form-control' placeholder='Upload your profile pic' onChange={e => setProfilePic(e.target.files[0])} />
                            </div>
                            <div className='mb-4 d-flex justify-content-center align-items-center'>
                                <button onClick={signUpUser} className='btn btn-primary'>Sign Up</button>
                            </div>
                            <div >
                                <p>Already Have an account? <Link to="/">Login Here</Link></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup