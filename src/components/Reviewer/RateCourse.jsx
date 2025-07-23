import React from 'react'

const RateCourse = () => {
    return (
        <div className='container py-5'>

            <h1>Rate a Course 🏫</h1>

            <div className='row'>

                <div >
                    <div className='col-md-12 d-flex justify-content-center align-items-center py-5'>
                        <div className='card shadow-sm' style={{ width: "45rem" }}>
                            <div className='card-header'>
                                <h4>Review</h4>
                            </div>
                            <div className='card-body'>
                                <form action="" className=''>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Enter Course Name</label>
                                        <input type="text" className='form-control' placeholder='ReactJS' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Enter Platform</label>
                                        <input type="text" className='form-control' placeholder='Youtube' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Pricing</label>
                                        <select name="" className='form-select' id="">
                                            <option value="">FREE</option>
                                            <option value="">PAID</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Difficulty</label>
                                        <select name="" className='form-select' id="">
                                            <option value="">BEGINNER</option>
                                            <option value="">INTERMEDIATE</option>
                                            <option value="">ADVANCED</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Certification Available</label>
                                        <select name="" className='form-select' id="">
                                            <option value="">YES</option>
                                            <option value="">NO</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Enter link</label>
                                        <input type="text" className='form-control' placeholder='http://Course-playlist-link' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Rating</label>
                                        <input type="text" className='form-control' placeholder='1 to 5' />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Comment</label>
                                        <input type="text" className='form-control' placeholder='1 to 5' />
                                    </div>
                                    <div className='form-group d-flex justify-content-center align-items-center'>
                                        <button className='btn btn-primary m-2 '>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default RateCourse