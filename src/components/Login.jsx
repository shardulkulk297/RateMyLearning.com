import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='container py-5'>
            <h1>Rate My Learning</h1>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-md-auto'>
                    <div className='card ' style={{ width: "30rem" }}>
                        <div className='card-header'>
                            <strong>Login</strong>
                        </div>
                        <div className='card-body'>

                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Name' />
                            </div>
                            <div className='mb-4'>
                                <input type="text" className='form-control' placeholder='Enter Password' />
                            </div>
                            <div>
                                <p>Don't have an account? <Link>Sign Up Here</Link></p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login