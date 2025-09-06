import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const Search = () => {
    const [reviews, setReviews] = useState([]);
    const [courseName, setCoursename] = useState("");

    const navigate = useNavigate();



    const goToSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/course/review/search/${courseName}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });

            const data = response.data;
            setReviews(data);

            if (data.length > 0) {
                navigate("/reviewer/search-results", { state: data });
            } else {
                toast.error("No results found for your search.");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <form action="" onSubmit={goToSearch}>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="🔍 Search for what you want to learn..."
                                value={courseName}
                                onChange={(e) => setCoursename(e.target.value)}
                            />
                            <button className="btn btn-primary" type='submit'>Search</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    )
}

export default Search