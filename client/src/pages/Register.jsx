import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
function Register() {
    const {storeTokenInLs,API} = useAuth();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    })
    const navigate = useNavigate();
    function handleInput(e) {
        // console.log(e.target.value)
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });


    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/auth/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
            console.log("response data : ", response);
            const resp_data= await response.json();
            console.log("This is resp_data:"+resp_data.message);
            if(response.ok){
                // console.log(response);
               
                storeTokenInLs(resp_data.token);
               
                setUser(
                   { username: "",
                    email: "",
                    phone: "",
                    password: ""}
                );
                toast.success("Registration successful")
                navigate('/login');
            }else{
                toast.error(resp_data.extraDetails ?resp_data.extraDetails:resp_data.message);
            }
           
          } catch (error) {
            console.error("Error", error);
          }

    }
    return (

        <>
            <div style={{ backgroundColor: "yellow", height: "80vh", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                <div>

                    <img src="https://st.depositphotos.com/1092019/3536/i/450/depositphotos_35365203-stock-photo-registration-on-blue-arrow.jpg" alt="" />
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' value={user.username} onChange={handleInput} type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name='email' value={user.email} onChange={handleInput} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control name='phone' value={user.phone} onChange={handleInput} type="text" placeholder="Enter phone" />
                        <Form.Text className="text-muted">
                            We'll never share your phone with anyone else.
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

export default Register;