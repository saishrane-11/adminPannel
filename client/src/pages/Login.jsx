import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
function login() {
    const {storeTokenInLs,API} = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    function handleInput(e) {
        console.log(e.target.value)
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        })
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        // alert(user);
        console.log(user);
        try {
            const response = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("LOGIN data : ", response);
            const resp_data= await response.json();
            console.log("This is resp_data:"+resp_data.token);
            storeTokenInLs(resp_data.token);
            if(response.ok){
                // localStorage.setItem("token",resp_data.token);
                setUser(
                   { 
                    email: "",
                    password: ""}
                );
                toast.success("Login successful");
                navigate('/');
            }else{
                toast.error(resp_data.extraDetails ?resp_data.extraDetails:resp_data.message);
            }

        } catch (error) {
            console.error("Error", error);
        }






    }
    return (

        <>
            <div style={{ backgroundColor: "yellow", height: "60vh", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                <div>

                    <img src="https://st.depositphotos.com/1092019/3536/i/450/depositphotos_35365203-stock-photo-registration-on-blue-arrow.jpg" alt="" />
                </div>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name='email' value={user.email} onChange={handleInput} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' value={user.password} onChange={handleInput} type="password" placeholder="Password" />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>

    );
}

export default login;