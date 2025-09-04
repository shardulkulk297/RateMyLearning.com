import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const MyReviews = () => {

  /*
  Page of showing users the reviews given by them
  */

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {

      try {

        const response = await axios.get("http://localhost:8080/api/review/getReviews", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
        console.log(response.data);
        setReviews(response.data);

      } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
      }
    }
    getReviews();
  }, [])
  return (
    <div className='container py-5'>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-light px-3 py-2 rounded shadow-sm">
          <li className="breadcrumb-item">
            <a href="/reviewer" className="text-decoration-none">🏠 Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Your Reviews
          </li>
        </ol>
      </nav>
      <div className='d-flex align-items-center mb-4'>
        <h2 className='mb-0 fw-bold text-primary'>📋 Your Reviews</h2>
        <span className='badge bg-secondary ms-3'>{reviews.length} Reviews</span>
      </div>

      <div className='card shadow-sm border-0'>
        <div className='card-body p-0'>
          <div className='table-responsive'>
            <table className='table table-hover mb-0'>
              <thead className='bg-primary text-white sticky-top'>
                <tr>
                  <th className='border-0 py-3 fw-semibold'>#</th>
                  <th className='border-0 py-3 fw-semibold'>Course</th>
                  <th className='border-0 py-3 fw-semibold'>Instructor</th>
                  <th className='border-0 py-3 fw-semibold'>Details</th>
                  <th className='border-0 py-3 fw-semibold'>Your Review</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review.id} className='border-bottom'>
                    <td className='py-3 fw-semibold text-muted'>{index + 1}</td>

                    {/* Course Info Column */}
                    <td className='py-3'>
                      <div className='d-flex align-items-start'>
                        <img
                          src={review.course.thumbnailUrl}
                          alt="Course thumbnail"
                          className="rounded me-3 shadow-sm"
                          style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className='mb-1 fw-bold text-dark'>{review.course.title}</h6>
                          <small className="text-muted">
                            📅 {new Date(review.course.publishedDate).toLocaleDateString()}
                          </small>
                          <br />
                          <span className='badge bg-light text-dark border mt-1'>
                            🎥 {review.course.platform}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Instructor Column */}
                    <td className='py-3'>
                      <a
                        href={review.course.instructor.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-decoration-none'
                      >
                        <div className='d-flex align-items-center'>
                          <span className='me-2'>👨‍🏫</span>
                          <span className='text-primary fw-medium'>{review.course.instructor.name}</span>
                        </div>
                      </a>
                    </td>

                    {/* Course Details Column */}
                    <td className='py-3'>
                      <div className='small'>
                        <div className='mb-2'>
                          <span className='badge bg-info text-white me-2'>🎯 {review.course.difficulty}</span>
                        </div>
                        <div className='text-muted mb-1'>
                          ⏱️ {review.course.durationMinutes ? `${review.course.durationMinutes} min` : 'N/A'}
                        </div>
                        <div className='text-muted mb-1'>
                          🎬 {review.course.videoCount ? `${review.course.videoCount} videos` : 'N/A'}
                        </div>
                        <div>
                          {review.course.isCertification === 'YES' ?
                            <span className='badge bg-success'>🎓 Certificate</span> :
                            <span className='badge bg-light text-muted border'>No Certificate</span>
                          }
                        </div>
                      </div>
                    </td>

                    {/* Review Column */}
                    <td className='py-3'>
                      <div className='mb-2'>
                        <div className='d-flex align-items-center mb-2'>
                          <span className='me-1'>⭐</span>
                          <span className='fw-bold text-warning'>{review.rating}</span>
                          <span className='text-muted'>/5</span>
                          <div className='ms-2'>
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'text-warning' : 'text-muted'}>
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className='text-muted small' style={{ maxWidth: '250px' }}>
                          {review.comment ? `"${review.comment}"` : 'No comment provided'}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {reviews.length === 0 && (
        <div className='text-center py-5'>
          <div className='text-muted'>
            <h4>📝 No reviews yet</h4>
            <p>Start reviewing courses to see them here!</p>
          </div>
        </div>
      )}
    </div>

  )
}

export default MyReviews