import { useEffect } from "react";
import { useAuth } from "../store/auth"
export const About =()=>{
    
    const {userDetail} = useAuth();
   
    console.log("use auth: "+userDetail);
    return <>
    <p>Hi {userDetail ? userDetail.username : `Welcome to our website`}</p>
    <h1>Welcome to About Page</h1>
    </>
}