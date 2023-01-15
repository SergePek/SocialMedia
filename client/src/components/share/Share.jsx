import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import LabelIcon from '@mui/icons-material/Label';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";

const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef()
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            //const fileName = file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("http://localhost:5000/api/upload", data);

            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.post("http://localhost:5000/api/posts/", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={
                        user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "person/noAvatar.png"
                    }
                        alt=""
                        className="shareProfileImg" />
                    <input placeholder={"Whats's in your mind " + user.username + "?"}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptonText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png, .jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className="shareIcon" />
                            <span className="shareOptonText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <RoomIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptonText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptonText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>

        </div>

    );
};

export default Share;