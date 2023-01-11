import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    console.log("post" + post)

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/users?userId=${post.userId}`);
            console.log(res.data);
            setUser(res.data);
        }
        fetchUser()
    }, [post.userId]);

    const likeHandler = (e) => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img className="postProfileImg"
                                src={user.profilePicture || PF + "person/noAvatar.png"}
                                alt=""
                            />
                        </Link>
                        <span className="postUserName">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" onClick={likeHandler} src={`${PF}like.png`} alt="" />
                        <img className="likeIcon" onClick={likeHandler} src={`${PF}heart.png`} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;