import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post"
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("http://localhost:5000/api/posts/profile/" + username)
                : await axios.get("http://localhost:5000/api/posts/timeline/" + user._id);
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
            console.log(res.data);
        }
        fetchPosts()
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
};

export default Feed;