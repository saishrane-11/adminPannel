import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import { useAuth } from "../store/auth"
export const AdminUser = () => {
    const { authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/admin/user/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            })
            const data = response.json();

            console.log("user deleted is :" + data);
            if(response.ok){
                getAllUsersData();
            }
        } catch (error) {
            console.log("delete user error: " + error);
        }

    }
    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/admin/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            })
            const data = await response.json();
            console.log("users from:" + data);
            setUsers(data);
        } catch (err) {
            console.log("this one error"+err);
        }
    }
    useEffect(() => {
        getAllUsersData();
    },[])
    return (

        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((currUser, index) => {
                        return (
                            <tr key={index}>
                                <td> {currUser.username}</td>
                                <td> {currUser.email}</td>
                                <td> {currUser.phone}</td>
                                <td><Link to={`/admin/user/${currUser._id}/edit`}>Edit</Link></td>
                                <td><button onClick={()=>deleteUser(currUser._id)}>Delete
                                </button></td>
                            </tr>
                        )


                    })
                    }
                </tbody>
            </table>


        </>

    )
}