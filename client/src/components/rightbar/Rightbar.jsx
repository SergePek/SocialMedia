import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';


const Rightbar = ({ user }) => {
    console.log(user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(
        currentUser.followings.includes(user?.id)
    );

    /* useEffect(() => {
        setFollowed(currentUser.followings.includes(user?.id))
    }, [currentUser, user.id]); */

    useEffect(() => {
        const getfriends = async () => {
            try {
                const friendList = await axios.get("http://localhost:5000/api/users/friends/" + user._id);
                setFriends(friendList.data);
            } catch (error) {
                console.log(error);
            }
        };
        getfriends();
        //console.log(friends);
    }, [user]);

    const handleClick = async (e) => {
        try {
            if (followed) {
                await axios.put("http://localhost:5000/api/users/" + user._id + "/unfollow", {
                    userId: currentUser._id
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put("http://localhost:5000/api/users/" + user._id + "/follow", {
                    userId: currentUser._id
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
           
        } catch (error) {
            console.log(error)
        }
        setFollowed(!followed);

    }

    const HomeRightBar = () => {

        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="/assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img src="/assets/ad.png" alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        )
    }
    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton"
                        onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}

                    </button>

                )}
                <h4 className="rightbarTitle">User information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{
                            user.relationship === 1
                                ? "Single"
                                : user.relationship === 2
                                    ? "Maried"
                                    : ""
                        }</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User friends</h4>
                <div className="rightbarFollowings">

                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} key={friend._id} style={{ textDecoration: "none" }}>
                            <div className="rightbarFollowing" >
                                <img src={friend.profilePicture
                                    ? PF + friend.profilePicture
                                    : PF + "person/noAvatar.png"}
                                    alt="" className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))
                    }

                </div>
            </>
        )
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    );
};

export default Rightbar;