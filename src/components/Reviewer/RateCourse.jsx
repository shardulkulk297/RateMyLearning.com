import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RateCourse = () => {
    const [title, setTitle] = useState("");
    const [platform, setPlatform] = useState("");
    const [pricing, setPricing] = useState("FREE");
    const [difficulty, setDifficulty] = useState("BEGINNER");
    const [certification, setCertification] = useState("YES");
    const [link, setLink] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [language, setLanguage] = useState("");
    const [metadata, setMetadata] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // utility helpers (keep these outside the function)
    const extractVideoId = (url) => {
        if (!url) return null;
        // covers: youtu.be/ID, youtube.com/watch?v=ID, /embed/ID, /v/ID, /shorts/ID
        const m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
        if (m) return m[1];
        // fallback: explicit ?v= param
        const qm = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
        return qm ? qm[1] : null;
    };

    const extractPlaylistId = (url) => {
        if (!url) return null;
        const m = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
        return m ? m[1] : null;
    };

    const isoDurationToMinutes = (iso) => {
        if (!iso) return null;
        const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const hours = parseInt(match?.[1] || 0, 10);
        const minutes = parseInt(match?.[2] || 0, 10);
        const seconds = parseInt(match?.[3] || 0, 10);
        // return rounded minutes
        return Math.round(hours * 60 + minutes + seconds / 60);
    };

    /**
     * Fetch metadata for a YouTube single-video or a playlist URL.
     * - Single video: one videos.list call -> returns durationMinutes (exact).
     * - Playlist: one playlists.list call -> returns playlist title, videoCount, estimated_total_duration_minutes = null.
     *
     * Returns a consistent object. Throws errors on invalid/missing API key or not-found.
     */
    const fetchYoutubeMetaData = async (videoUrl) => {
        if (!videoUrl) throw new Error("No URL provided");

        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        if (!apiKey) throw new Error("Missing YouTube API key (VITE_YOUTUBE_API_KEY)");

        // 1) Try to extract a direct video id
        const videoId = extractVideoId(videoUrl);
        if (videoId) {
            // Single video -> videos.list (one request)
            const videosEndpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;
            const res = await fetch(videosEndpoint);
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`YouTube videos.fetch failed: ${res.status} ${txt}`);
            }
            const data = await res.json();
            if (!data.items || data.items.length === 0) throw new Error("Video not found");

            const { snippet, contentDetails } = data.items[0];
            const durationMinutes = isoDurationToMinutes(contentDetails?.duration);

            const channelId = snippet.channelId;
            const channelTitle = snippet.channelTitle;
            const profileUrl = channelId ? `https://www.youtube.com/channel/${channelId}` : null;

            return {
                kind: "video",
                title: snippet.title,
                description: snippet.description || "",
                instructor: { channelTitle, channelId, profileUrl },
                thumbnailUrl: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || "",
                publishedDate: snippet.publishedAt || null,
                videoCount: 1,
                durationMinutes: durationMinutes // exact duration in minutes (number)
            };
        }

        // 2) No direct video id -> check for playlist id
        const playlistId = extractPlaylistId(videoUrl);
        if (playlistId) {
            // Single request: playlists.list with snippet + contentDetails
            const playlistsEndpoint = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${apiKey}`;
            const res = await fetch(playlistsEndpoint);
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(`YouTube playlists.fetch failed: ${res.status} ${txt}`);
            }
            const data = await res.json();
            if (!data.items || data.items.length === 0) throw new Error("Playlist not found");

            const playlistSnippet = data.items[0].snippet || {};
            const playlistDetails = data.items[0].contentDetails || {};

            const playlistTitle = playlistSnippet.title || null;
            const playlistDescription = playlistSnippet.description || "";
            const playlistThumbnail = playlistSnippet.thumbnails?.medium?.url || playlistSnippet.thumbnails?.default?.url || "";
            const channelId = playlistSnippet.channelId || null;
            const channelTitle = playlistSnippet.channelTitle || null;
            const profileUrl = channelId ? `https://www.youtube.com/channel/${channelId}` : null;

            // contentDetails.itemCount gives number of videos in playlist
            const videoCount = Number.isFinite(playlistDetails.itemCount) ? playlistDetails.itemCount : null;

            return {
                kind: "playlist",
                playlistId,
                title: playlistTitle,                       // playlist title
                description: playlistDescription,
                instructor: { channelTitle, channelId, profileUrl },
                thumbnailUrl: playlistThumbnail,
                publishedDate: playlistSnippet.publishedAt || null,
                videoCount: videoCount,                                 // exact number of items in playlist
                durationMinutes: null      // intentionally null (see explanation)
            };
        }

        // 3) Neither video nor playlist found
        throw new Error("Invalid YouTube URL: no video id or playlist (list=) found");
    };

    const submitReview = async (e) => {
        e.preventDefault()
        try {
            console.log(platform, pricing, difficulty, certification, link, rating, comment);

            setLoading(true);
            const metadata = await fetchYoutubeMetaData(link);
            console.log(metadata)// use the user's input link
            // title: snippet.title,
            // description: snippet.description,
            // instructor: snippet.channelTitle,
            // thumbnailUrl: snippet.thumbnails.medium.url,
            // publishedDate: snippet.publishedAt,
            // durationMinutes
            const response = await axios.post("http://localhost:8080/api/review/add", {
                course: {
                    link: link,
                    title: metadata.title,
                    platform: platform,
                    thumbnailUrl: metadata.thumbnailUrl,
                    publishedDate: metadata.publishedDate,
                    priceModel: pricing,
                    difficulty: difficulty,
                    isCertification: certification,
                    typeOfCourse: metadata.kind,
                    videoCount: metadata.videoCount,
                    durationMinutes: metadata.durationMinutes,
                    language: language,
                    instructor: {
                        name: metadata.instructor.channelTitle,
                        profileUrl: metadata.instructor.profileUrl
                    }
                },
                review: {
                    rating: rating,
                    comment: comment,
                    instructor: {
                        name: metadata.instructor.channelTitle,
                        profileUrl: metadata.instructor.profileUrl
                    }
                }
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            })
            console.log(response.data);
            toast.success("Review Posted Successfully!!");
            toast.success("Navigating to your reviews");
            setTimeout(() => {
                navigate("/reviewer/your-reviews");
            }, 3000);
            setLoading(false);
        } catch (error) {
            console.log(error);
            const message = error?.response.data.message;
            toast.error(message);
        }



    }

    const getEmbeddedUrl = (url) => {
        if (!url) return null;

        // Quick check: already an embed URL -> return as-is (normalized)
        if (url.includes("youtube.com/embed")) {
            return url;
        }

        // try to parse the URL using the browser URL API (robust)
        let parsed = null;
        try {
            parsed = new URL(url);
        } catch (e) {
            // not a valid absolute URL, fall back to regex
        }

        // 1) try query params first (watch?v=, list=)
        let videoId = null;
        let playlistId = null;
        if (parsed) {
            // handle common host variants like youtu.be won't have search params, but youtube.com will
            videoId = parsed.searchParams.get("v") || null;
            playlistId = parsed.searchParams.get("list") || null;

            // if hostname is youtu.be, the pathname contains the id
            if (!videoId && /(^|\.?)youtu\.be$/.test(parsed.hostname)) {
                const p = parsed.pathname.slice(1); // remove leading /
                if (p) videoId = p.split(/[/?#]/)[0];
            }
        }

        // 2) fallback: regex to capture id from other formats (embed, shorts, youtu.be direct, /v/, etc.)
        if (!videoId) {
            const m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([A-Za-z0-9_-]{11})/);
            if (m) videoId = m[1];
        }

        // ensure playlistId is found by regex if not found in search params
        if (!playlistId) {
            const pm = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
            if (pm) playlistId = pm[1];
        }

        // Build embed URL:
        // - If we have a videoId, embed that. If playlistId also exists, append ?list= to start inside playlist.
        // - If only playlistId exists, return playlist embed URL.
        if (videoId) {
            return playlistId
                ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}`
                : `https://www.youtube.com/embed/${videoId}`;
        }

        if (playlistId) {
            // playlist embed; videoseries is commonly used for playlists
            return `https://www.youtube.com/embed?listType=playlist&list=${playlistId}`;
            // or: return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
        }

        // not a recognized youtube URL
        toast.error("As of now only courses available on YouTube can be rated");
        return null;
    };

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

                                <div className='mb-3'>
                                    <label className="form-label">Language</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={language}
                                        onChange={e => setLanguage(e.target.value)}
                                    />

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