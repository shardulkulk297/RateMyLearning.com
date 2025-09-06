import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const reviews = location.state || []; // fallback
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    language: '',
    duration: '',
    difficulty: ''
  });

  const handleViewReviews = (courseId) => {
    navigate(`/reviewer/view-reviews`, { state: courseId });
  };

  // Filter logic
  const filteredCourses = reviews.filter(item => {
    const course = item.course;
    const matchLanguage = filters.language === '' || course.language.toLowerCase() === filters.language.toLowerCase();
    const matchDifficulty = filters.difficulty === '' || course.difficulty === filters.difficulty;

    let matchDuration = true;
    if (filters.duration === '<60') matchDuration = course.durationMinutes < 60;
    else if (filters.duration === '60-120') matchDuration = course.durationMinutes >= 60 && course.durationMinutes <= 120;
    else if (filters.duration === '>120') matchDuration = course.durationMinutes > 120;

    return matchLanguage && matchDifficulty && matchDuration;
  });

  return (
    <div className='container py-5'>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-light px-3 py-2 rounded shadow-sm">
          <li className="breadcrumb-item">
            <a href="/reviewer" className="text-decoration-none">🏠 Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Search Results
          </li>
        </ol>
      </nav>

      <h2 className='mb-4 fw-bold text-primary'>📚 Search Results</h2>

      <div className="mb-4 row g-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Language</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., English"
            value={filters.language}
            onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Duration</label>
          <select
            className="form-select"
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          >
            <option value="">All</option>
            <option value="<60">Less than 60 min</option>
            <option value="60-120">60 to 120 min</option>
            <option value=">120">More than 120 min</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Difficulty</label>
          <select
            className="form-select"
            value={filters.difficulty}
            onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
          >
            <option value="">All</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>
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
                  <th className='border-0 py-3 fw-semibold'>Reviews</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((item, index) => {
                  const course = item.course;
                  const instructor = course?.instructor;

                  return (
                    <tr key={course.id}>
                      <td className='py-3 fw-semibold text-muted'>{index + 1}</td>

                      <td className='py-3'>
                        <div className='d-flex align-items-start'>
                          <img
                            src={course.thumbnailUrl}
                            alt='Thumbnail'
                            className='rounded me-3 shadow-sm'
                            style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className='mb-1 fw-bold text-dark'>{course.title}</h6>
                            <small className="text-muted">📅 {course.publishedDate}</small><br />
                            <span className='badge bg-light text-dark border mt-1'>
                              🎥 {course.platform}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className='py-3'>
                        {instructor && (
                          <a
                            href={instructor.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-decoration-none'
                          >
                            <div className='d-flex align-items-center'>
                              <span className='me-2'>👨‍🏫</span>
                              <span className='text-primary fw-medium'>{instructor.name}</span>
                            </div>
                          </a>
                        )}
                      </td>

                      <td className='py-3 small'>
                        <span className='badge bg-info text-white me-2'>🎯 {course.difficulty}</span>
                        <div className='text-muted'>⏱️ {course.durationMinutes} min</div>
                        <div className='text-muted'>🎬 {course.videoCount} videos</div>
                        <div className='text-muted'>🗣️ {course.language}</div>
                        <div>
                          {course.isCertification === 'YES' ?
                            <span className='badge bg-success'>🎓 Certificate</span> :
                            <span className='badge bg-light text-muted border'>No Certificate</span>}
                        </div>
                      </td>

                      <td className='py-3'>
                        <div className='mb-2'>
                          <div>
                            ⭐ <strong>{item.avgRating || 0}</strong> / 5
                          </div>
                          <div className='text-muted small'>
                            🗳️ {item.totalReviews} Reviews
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewReviews(course.id)}
                          className='btn btn-outline-primary btn-sm'
                        >
                          View Reviews
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {reviews.length === 0 && (
        <div className='text-center py-5'>
          <div className='text-muted'>
            <h4>🔍 No courses found</h4>
            <p>Try searching something else.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
