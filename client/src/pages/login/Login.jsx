import { useRef } from "react";
import "./login.css"
import { loginCall } from "../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
    };
    console.log(user);
    console.log(error);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">Найдите друзей и ощайтесь</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email} />
                        <input placeholder="Password"
                            type="password"
                            required
                            minLength="6"
                            ref={password}
                            className="loginInput" />
                        <button className="loginButton" disabled={isFetching}
                        >{isFetching
                            ? <CircularProgress size={20}/>
                            :
                            "Войти"}</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton">Создать аккаунт</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;