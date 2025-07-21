import React, { use, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Layout = () => {
   const navigate = useNavigate();
   useEffect(() => {
        let token = localStorage.getItem('token');
        if (token == null || token == undefined || token == "")
            navigate("/")
    }, [navigate]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
        <div className='container'>
          <Link className='navbar-brand fw-bold' to="/">
            <span>🏫 RateMyLearning</span>
          </Link>
          <div className='d-flex'>
            <Link to="/reviewer/profile " className="btn btn-primary me-2">
              Profile
            </Link>
            <Link to="/reviewer/my-reviews" className='btn btn-primary'>
            Your Reviews</Link>
          </div>
        </div>
      </nav>
      <Outlet/>
    </>
  )
}

export default Layout