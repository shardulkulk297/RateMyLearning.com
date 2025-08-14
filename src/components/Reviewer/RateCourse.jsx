import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const RateCourse = () => {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [pricing, setPricing] = useState("FREE");
    const [difficulty, setDifficulty] = useState("BEGINNER");
    const [certification, setCertification] = useState("YES");
    const [link, setLink] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    const extractVideoId = (url)=>{
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const fetchYoutubeMetaData = (videoUrl)=>{
        const videoId = extractVideoId(videoUrl);
        if(!videoId){
            toast.error("INVALID URL");
            throw new Error("Invalid YOUTUBE URL");            
        }

        const apiKey = 
    }

    const submitReview = async (e) => {
        e.preventDefault()
        try {
            // console.log(title, platform, pricing, difficulty, certification, link, rating, comment);

            const response = await axios.post("http://localhost:8080/api/review/add", {
                course: {

                    title: title,
                    platform: platform,
                    pricing: pricing,
                    difficulty: difficulty,
                    certification: certification,


                }
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            })

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='container py-5'>

            <h1>Rate a Course 🏫</h1>

            <div className='row'>

                <div >
                    <div className='col-md-12 d-flex justify-content-center align-items-center '>
                        <div className='card shadow-sm' style={{ width: "45rem" }}>
                            <div className='card-header'>
                                <h4>Review</h4>
                            </div>
                            <div className='card-body'>
                                <form action="" className=''>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Enter Course Name</label>
                                        <input type="text" value={title} className='form-control' placeholder='ReactJS' onChange={e => setTitle(e.target.value)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Enter Platform</label>
                                        <input type="text" className='form-control' placeholder='Youtube' value={platform} onChange={e => setPlatform(e.target.value)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Pricing</label>
                                        <select name="" className='form-select' id="" value={pricing} onChange={e => setPricing(e.target.value)}>
                                            <option value="" disabled>Select Pricing model</option>
                                            <option value="FREE">FREE</option>
                                            <option value="PAID">PAID</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Difficulty</label>
                                        <select name="" className='form-select' id="" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                            <option value="" disabled>Select Difficulty</option>
                                            <option value="BEGINNER">BEGINNER</option>
                                            <option value="INTERMEDIATE">INTERMEDIATE</option>
                                            <option value="ADVANCED">ADVANCED</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Certification Available</label>
                                        <select name="" className='form-select' id="" value={certification} onChange={e => setCertification(e.target.value)}>
                                            <option value="" disabled>Select</option>
                                            <option value="YES">YES</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Enter link</label>
                                        <input type="text" className='form-control' placeholder='http://Course-playlist-link' value={link} onChange={e => setLink(e.target.value)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Rating</label>
                                        <input type="text" className='form-control' placeholder='1 to 5' value={rating} onChange={e => setRating(e.target.value)} />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor="" className='form-label'>Comment</label>
                                        <textarea name="" className='form-control' value={comment} onChange={e => setComment(e.target.value)} id="" placeholder='This course has helped me to .....'></textarea >
                                    </div>
                                    <div className='form-group d-flex justify-content-center align-items-center'>
                                        <button className='btn btn-primary m-2' onClick={submitReview}>Submit</button>
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