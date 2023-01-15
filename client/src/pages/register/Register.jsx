import axios from "axios";
import { useRef} from "react";
import "./register.css"
import {useNavigate} from "react-router-dom"

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            //passwordAgain.current.setCustomValidity("Password don't match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                const res = await axios.post("http://localhost:5000/api/auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }

        }
    }
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">Найдите друзей и ощайтесь</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username"
                            required
                            ref={username}
                            className="loginInput"
                        />
                        <input placeholder="Email"
                            required
                            type="email"
                            ref={email}
                            className="loginInput"
                        />
                        <input placeholder="Password"
                            ref={password}
                            required
                            type="password"
                            minLength={6}
                            className="loginInput"
                        />
                        <input placeholder="Password again"
                            ref={passwordAgain}
                            required
                            type="password"
                            minLength={6}
                            className="loginInput"
                        />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton">Создать аккаунт</button>
                    </form  >
                </div>
            </div>
        </div>
    );
};

export default Register;