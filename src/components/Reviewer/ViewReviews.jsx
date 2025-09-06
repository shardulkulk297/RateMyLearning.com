import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ViewReviews = () => {
  const location = useLocation();
  const courseId = location.state;
  const [reviews, setReviews] = useState([]);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/review/getReviewsForCourse/${courseId}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem('token') }
        });
        console.log(response.data);
        setReviews(response.data);
        if (response.data.length > 0) {
          setCourse(response.data[0].course);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getReviews();
  }, [courseId]);

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-light px-3 py-2 rounded shadow-sm">
          <li className="breadcrumb-item">
            <a href="/reviewer" className="text-decoration-none">🏠 Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Course Reviews
          </li>
        </ol>
      </nav>

      {/* Course Info Card */}
      {course && (
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body d-flex align-items-center">
            <img
              src={course.thumbnailUrl}
              alt="Thumbnail"
              className="rounded me-4 shadow-sm"
              style={{ width: '120px', height: '80px', objectFit: 'cover' }}
            />
            <div>
              <h4 className="mb-1 fw-bold text-dark">{course.title}</h4>
              <div className="text-muted mb-1">🎥 {course.platform} | 🎯 {course.difficulty}</div>
              <div className="text-muted small">
                {course.instructor && (
                  <>
                    👨‍🏫 <a href={course.instructor.profileUrl} target="_blank" rel="noreferrer" className="text-decoration-none text-primary">
                      {course.instructor.name}
                    </a>
                  </>
                )}
                <span className="ms-3">⏱️ {course.durationMinutes} mins</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Heading */}
      <h4 className="mb-3 fw-bold text-primary">📝 Student Reviews</h4>

      {/* Reviews */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {reviews.length === 0 ? (
            <div className="text-center text-muted py-5">No reviews found for this course.</div>
          ) : (
            <ul className="list-group list-group-flush">
              {reviews.map((review) => (
                <li key={review.id} className="list-group-item py-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <strong>👤 Reviewer:</strong>{' '}
                      {review.reviewer?.name || <span className="text-muted">Anonymous</span>}
                    </div>
                    <div>
                      <strong>⭐ {review.rating} / 5</strong>{' '}
                      <span className="ms-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-warning' : 'text-muted'}>★</span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="text-muted">
                    <strong>💬 Comment:</strong>{' '}
                    {review.comment ? `"${review.comment}"` : <span className="fst-italic text-muted">No comment</span>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReviews;
