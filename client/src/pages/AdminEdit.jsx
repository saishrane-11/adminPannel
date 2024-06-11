import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import {useAuth} from "../store/auth";
export const AdminEdit =()=>{
    const [data,setData]= useState({
        username:"",
        email:"",
        phone:""
    })
    const params =useParams();
    const {authorizationToken} =useAuth();
    console.log("params of single user is :"+params.userId);
    const getSingleUserData = async ()=>{
     try{
        const response = await fetch(`http://localhost:5001/api/admin/user/${params.userId}`,{
            method:"GET",
            headers:{
                Authorization:authorizationToken
            }
        })
        const data1 = await response.json();
        console.log("data1:"+data1);
        setData(data1);
     }catch(error){
        console.log(error);
     } 

    }
    useEffect(()=>{
        getSingleUserData();
    },[])

    const handleInput=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [name]:value,
        })
    }

    //to update the data in backend
    const handleUpdate = async ()=>{
        try{
            // localhost:5001/api/admin/user/update/6662e54f3d504111566ba3e9
            const response = fetch(`http://localhost:5001/api/admin/user/update/${params.userId}`,{
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json",
                    Authorization:authorizationToken
                },
                body:JSON.stringify(data)
            })
            alert("updated successful");
            // console.log("response:"+response.ok);
            // const resp_data= await response.json();
            // console.log("response.data: "+resp_data);
        }catch(error){  
            console.log(error);
        }
    }
    return (
        <div>
            {/* localhost:5001/api/admin/user/6662e54f3d504111566ba3e9 */}
            <div style={{padding:"10px"}}>
                <input type="text" name="username" onChange={(e)=>{handleInput(e)}} placeholder="username"  id="" value={data.username} />
                <input type="text" onChange={(e)=>{handleInput(e)}}  name="email" placeholder="email" id="" value={data.email} />
                <input type="text" onChange={(e)=>{handleInput(e)}}  name="phone" placeholder="phone" id="" value={data.phone} />

            </div>
            <div>
                <button onClick={handleUpdate}>Submit</button>
            </div>
        </div>
    )
}