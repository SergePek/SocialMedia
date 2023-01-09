import "./login.css"

const Login = () => {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social</h3>
                    <span className="loginDesc">Найдите друзей и ощайтесь</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <button className="loginButton">Войти</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton">Создать аккаунт</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;