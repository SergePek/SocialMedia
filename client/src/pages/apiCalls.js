import axios from "axios";

export const loginCall = async (userCredentional, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {                             
        const res = await axios.post("http://localhost:5000/api/auth/login", userCredentional)
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}