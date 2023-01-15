import { createContext, useReducer } from "react";
import AuthReduser from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        username: "Serega",
        email: "serega@mail.ru",
        password: "$2b$10$2z5nyltdCPyqYWekCKPwuuQYefMCD0zrf87XLb6LMb18Vu/Z9CsJ.",
        profilePicture: "person/1.jpeg",
        coverPicture: "",
        followers: [],
        following: [],
        isAdmin: false,
        _id: "63c3dffd9f45baf0f35214f8",
        createdAt: "2023-01-15T11:14:05.579Z",
        updatedAt: "2023-01-15T11:14:05.579Z",
        __v: 0
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReduser, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};