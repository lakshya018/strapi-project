import { createContext, useState } from "react";
import { useRouter } from "next/router";
// import { setToken } from "../lib/auth";
import Cookies from 'js-cookie';
import { getTokenFromLocalCookie } from "../lib/auth";

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const host = "http://localhost:1337"

    const logOutUser = async (email) => {
    setUser(null);
    router.push('/');
    }

    const getUser = async (email) => {
        const jwt = getTokenFromLocalCookie();
        try{
            const data = await fetch(`${host}/api/users/me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                },
            });
            console.log(data.json());
            const json = await data.json();

            setUser(json);

        }catch(err){
            console.log(err);
        }
    }

    return (
    <AuthContext.Provider value={{ user, logOutUser }}>
        {props.children}
    </AuthContext.Provider>
)
}

export default AuthContext;