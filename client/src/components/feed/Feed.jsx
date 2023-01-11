import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("http://localhost:5000/api/posts/profile/" + username)
                : await axios.get("http://localhost:5000/api/posts/timeline/63bedf2a949c8ed67a1b4090");
            setPosts(res.data);
        }
        fetchPosts()
    }, [username]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
};

export default Feed;