import { useEffect,useState } from "react";
import { Outlet } from "react-router-dom"
import {useAuth} from "../store/auth"
import {toast} from "react-toastify";
export const AdminContact =()=>{
    const {authorizationToken} = useAuth();
    const [contacts,setContacts] = useState([]);
    const getAllContacts = async ()=>{
        try{
            const response = await fetch("http://localhost:5001/api/admin/contact",{
                method:"GET",
                headers:{
                    Authorization:authorizationToken,
                }
            })
            const resp_data = await response.json();
            // console.log("contacts data: "+resp_data);
            setContacts(resp_data);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllContacts();
    },[])
    const deleteContact = async(id)=>{
        try{
            const response = await fetch(`http://localhost:5001/api/admin/contact/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:authorizationToken
                }
            })
            console.log(response.json())
            if(response.ok){
                getAllContacts();
                toast.success("Contact Deleted");
            }
            
        }catch(error){
            console.log(error)
        }
    }
    return <>
    <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((currContact, index) => {
                        return (
                            <tr key={index}>
                                <td> {currContact.username}</td>
                                <td> {currContact.email}</td>
                                <td> {currContact.message}</td>
                                <td><button onClick={()=>deleteContact(currContact._id)}>Delete
                                </button></td>
                            </tr>
                        )


                    })
                    }
                </tbody>
            </table>
    
   </>
}