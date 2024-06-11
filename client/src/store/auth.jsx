import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem('token'));
    const authorizationToken = `Bearer ${token}`;
    const [isLoading, setIsLoading] = useState(true);
    const [userDetail,setUserDetail] = useState("");
    const API = import.meta.env.VITE_APP_URI_API;
    console.log("API"+API)
    const storeTokenInLs = (serverToken)=>{
        setToken(serverToken)
        return localStorage.setItem('token',serverToken);
    }
    let isLoggedIn=!!token;
    console.log("isloggedin:"+isLoggedIn);
    const LogOutUser =()=>{
        setToken("");
        return localStorage.removeItem('token');
    }
    useEffect(()=>{
        userAuthentication();
    },[])
    const userAuthentication =async ()=>{
        try{
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                method: "GET",
                headers: {
                  Authorization: authorizationToken,
                },
              });
              console.log("now token"+token)
            console.log("uAuth resp:"+response)
            if(response.ok){
                console.log(isLoading);
               
                const data = await response.json();
                console.log("user:",data);
                setUserDetail(data);
                setIsLoading(false);
              
            }else{
                console.log("Error fetching user data");
                setIsLoading(false);
            }
        }catch(err){
            console.error(err);
        }
    }
    return <AuthContext.Provider value={{API, isLoading,isLoggedIn,storeTokenInLs, LogOutUser, userDetail,authorizationToken}} >
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);

    if(!authContextValue){
        throw new Error("use Authprovider properly");
    }
    return authContextValue;
}