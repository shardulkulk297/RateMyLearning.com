import React, { use, useEffect, useState } from 'react'
import Search from './Search'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  const [avgRating, setAvgRatings] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("http://localhost:8080/api/user/getLoggedInUserDetails", {
        headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
      })
      console.log(response.data);
      setUser(response.data);
    }                  
    getUser();
  }, [])

  useEffect(()=>{
    const getReviewStats = async()=>{
      try {
        const response = await axios.get("http://localhost:8080/api/review/getTotalReviews",{
          headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
        })
        console.log(response.data);
        setTotalReviews(response.data);

        const response2 = await axios.get("http://localhost:8080/api/review/getAvgRating",{
           headers: {'Authorization': "Bearer " + localStorage.getItem('token')}
        })
        console.log(response2.data);
        setAvgRatings(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getReviewStats();
  },[totalReviews, avgRating])

  return (
    <div className='container py-3'>

      <div className="row mb-4 text-center">
        <div className="col">
          <Search />
          <h1 className="">Welcome back, {user?.userDto.username}</h1>
          <p className="text-muted">Here's a summary of your activity on RateMyLearning.</p>
        </div>
      </div>

      <div className="row mb-5 text-center">
        <div className="col">
          <h2>What would you like to do?</h2>
          <Link to="/reviewer/rate-course" className="btn btn-primary btn-lg me-3 mt-3">
            ➕ Rate a New Course
          </Link>
          <Link to="/reviewer/your-reviews" className="btn btn-secondary btn-lg mt-3">
            📖 View All My Reviews
          </Link>
        </div>
      </div>



      <div className="row mb-5 d-flex justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Courses Rated</h5>
              <p className="fw-bold">{totalReviews === 0 ? "No Reviews given yet" : totalReviews}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center  shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Your Average Rating</h5>
              <p className="fw-bold">{avgRating === 0 ? "No Ratings given yet" : avgRating} ⭐</p>
            </div>
          </div>
        </div>
      </div>




      


    </div>
  )
}

export default Dashboard