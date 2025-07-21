import React, { useEffect } from 'react'
import Search from './Search'

const Dashboard = () => {

  useEffect(()=>{
    
  })

  return (
    <div className='container py-3'>
      
      <div className="row mb-4">
        <div className="col">
          <Search />
          <h1 className="">Welcome back, [Username]!</h1>
          <p className="text-muted">Here's a summary of your activity on RateMyLearning.</p>
        </div>
      </div>


      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Courses Rated</h5>
              <p className="display-4 fw-bold">12</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Your Average Rating</h5>
              <p className="display-4 fw-bold">4.2 ⭐</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Last Review Date</h5>
              <p className="h4 mt-3">July 15, 2025</p>
            </div>
          </div>
        </div>
      </div>


      <div className="row mb-5 text-center">
        <div className="col">
          <h2>What would you like to do?</h2>
          <a href="/reviewer/rate-course" className="btn btn-primary btn-lg me-3 mt-3">
            ➕ Rate a New Course
          </a>
          <a href="/reviewer/my-reviews" className="btn btn-secondary btn-lg mt-3">
            📖 View All My Reviews
          </a>
        </div>
      </div>


      <div className="row">
        <div className="col">
          <h3>Your Recent Reviews</h3>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">The Ultimate React Course 2025</h5>
                <small className="text-muted">Reviewed on: July 15, 2025</small>
              </div>
              <span className="badge bg-primary rounded-pill fs-6">5 ⭐</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">Spring Boot for Beginners</h5>
                <small className="text-muted">Reviewed on: July 10, 2025</small>
              </div>
              <span className="badge bg-primary rounded-pill fs-6">4 ⭐</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">Advanced SQL Masterclass</h5>
                <small className="text-muted">Reviewed on: June 28, 2025</small>
              </div>
              <span className="badge bg-primary rounded-pill fs-6">4 ⭐</span>
            </li>
          </ul>
        </div>
      </div>


    </div>
  )
}

export default Dashboard