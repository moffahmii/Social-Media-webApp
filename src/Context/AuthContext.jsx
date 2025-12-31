import { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../Services/AuthServices";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

    const [userData, setUserData] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);
    async function getUserdata() {
        const response = await getUserDataApi()
        if (response.message) {
            setUserData(response.user)
        }
    }
    useEffect(() => {
        if (isLoggedIn) {
            getUserdata()
        }

    }, [isLoggedIn])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
}
