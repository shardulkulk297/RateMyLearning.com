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
    const [metadata, setMetadata] = useState(null);
    const [loading, setLoading] = useState(false);
    const extractVideoId = (url) => {
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([A-Za-z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    //Code to convert duration to minutes of youtube video
    const isoDurationToMinutes = (iso) => {
        const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const hours = parseInt(match[1] || 0, 10);
        const minutes = parseInt(match[2] || 0, 10);
        const seconds = parseInt(match[3] || 0, 10);
        return hours * 60 + minutes + (seconds / 60);
    };

    //Function to fetch The youtube metadata
    const fetchYoutubeMetaData = async (videoUrl) => {
        // const videoId = extractVideoId(videoUrl);
        const videoId = extractVideoId("https://youtu.be/SfOaZIGJ_gs");
        if (!videoId) {
            toast.error("INVALID URL");
            throw new Error("Invalid YOUTUBE URL");
        }

        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;;
        const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;

        const response = await fetch(endpoint);
        const data = await response.json();
        console.log(data);

        if (!data.items || data.items.length === 0) {
            throw new Error("Video not found");
        }

        const { snippet, contentDetails } = data.items[0];
        const durationMinutes = isoDurationToMinutes(contentDetails.duration);

        return {
            title: snippet.title,
            description: snippet.description,
            instructor: snippet.channelTitle,
            thumbnailUrl: snippet.thumbnails.medium.url,
            publishedDate: snippet.publishedAt,
            durationMinutes
        };

    }

    const submitReview = async (e) => {
        e.preventDefault()
        try {
            // console.log(title, platform, pricing, difficulty, certification, link, rating, comment);


            const handleFetchMetadata = async () => {
                try {
                    setLoading(true);
                    const data = await fetchYoutubeMetaData("https://youtu.be/_9_0AyCLDNY");
                    setMetadata(data);
                    console.log(metadata);
                } catch (err) {
                    alert(err.message);
                } finally {
                    setLoading(false);
                }
            };
            handleFetchMetadata();
            // title: snippet.title,
            // description: snippet.description,
            // instructor: snippet.channelTitle,
            // thumbnailUrl: snippet.thumbnails.medium.url,
            // publishedDate: snippet.publishedAt,
            // durationMinutes
            const response = await axios.post("http://localhost:8080/api/review/add", {
                course: {
                     
                    title: metadata.title,
                    platform: platform,
                    thumbnail: metadata.thumbnailUrl,
                    publishedDate: metadata.publishedDate,
                    priceModel: pricing,
                    

                   


                }
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            })

        } catch (error) {
            console.log(error);
        }

    }

    const getEmbeddedUrl = (url) => {
        if (!url) return null;
        const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
        const id = m ? m[1] : null;

        if (id === null) {
            toast.error("As of now courses that are available on youtube can be rated")
        }

        return id ? `https://www.youtube.com/embed/${id}` : null;

    }
    const trimmedLink = link?.trim() || "";
    const embedUrl = getEmbeddedUrl(trimmedLink);

    return (
        <div className="container py-5">
            <h2 className="mb-4">Rate a Course 🏫 <span className="badge bg-info text-dark align-middle">YouTube only</span></h2>

            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card shadow-sm rounded">
                        <div className="card-body p-4">
                            <form onSubmit={submitReview}>
                                {/* Link + preview */}
                                <div className="mb-3">
                                    <label className="form-label">Course link</label>
                                    <input
                                        type="text"
                                        value={link}
                                        className="form-control"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        onChange={e => setLink(e.target.value)}
                                    />
                                    {embedUrl ? (
                                        <div className="ratio ratio-16x9 mt-3 embed-container" style={{ maxWidth: 700 }}>
                                            <iframe
                                                title="Course preview"
                                                src={embedUrl}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                loading="lazy"
                                            />
                                        </div>
                                    ) : (
                                        /* if link exists but not a YT link: small inline helper (no big empty box) */
                                        trimmedLink ? (
                                            <div className="mt-2">
                                                <small className="text-muted">
                                                    Currently only YouTube links are supported. Your link looks like a non-YouTube URL.
                                                </small>
                                            </div>
                                        ) : null
                                    )}
                                </div>

                                {/* Platform (small) */}
                                <div className="mb-3">
                                    <label className="form-label small text-muted">Platform</label>
                                    <input
                                        type="text"
                                        value={platform}
                                        className="form-control form-control-sm"
                                        placeholder="YouTube"
                                        onChange={e => setPlatform(e.target.value)}
                                    />
                                </div>

                                {/* Two-column row for concise selects */}
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label">Pricing</label>
                                        <select className="form-select" value={pricing} onChange={e => setPricing(e.target.value)}>
                                            <option value="" disabled>Select pricing</option>
                                            <option value="FREE">FREE</option>
                                            <option value="PAID">PAID</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label">Difficulty</label>
                                        <select className="form-select" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                            <option value="" disabled>Select difficulty</option>
                                            <option value="BEGINNER">BEGINNER</option>
                                            <option value="INTERMEDIATE">INTERMEDIATE</option>
                                            <option value="ADVANCED">ADVANCED</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Certification + Rating Row */}
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label">Certification</label>
                                        <select className="form-select" value={certification} onChange={e => setCertification(e.target.value)}>
                                            <option value="" disabled>Select</option>
                                            <option value="YES">YES</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>

                                    <div className="col-12 col-md-6 mb-3">
                                        <label className="form-label">Rating (1–5)</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            className="form-control"
                                            value={rating}
                                            onChange={e => setRating(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Comment */}
                                <div className="mb-3">
                                    <label className="form-label">Comment</label>
                                    <textarea
                                        className="form-control"
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        rows="4"
                                        placeholder="This course helped me to..."
                                    />
                                </div>

                                {/* Submit */}
                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="submit" className="btn btn-primary">
                                        Submit Review
                                    </button>
                                </div>
                            </form>
                        </div> {/* card-body */}
                    </div> {/* card */}
                </div> {/* col */}
            </div> {/* row */}
        </div>

    )
}

export default RateCourse