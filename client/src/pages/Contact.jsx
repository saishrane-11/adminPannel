import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useAuth } from '../store/auth';
function Contact() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        message: ""

    })
    const { userDetail ,API} = useAuth();
    const [userData, setUserData] = useState(true);
    console.log("user detail in con: " + userDetail);
    if (userDetail && userData) {
        setUser({
            username: userDetail.username,
            email: userDetail.email,
            message: ""
        })
        setUserData(false);
    }

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
        try {
            const response = await fetch(`${API}/api/form/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log("cot resp" + response);

            if (response.ok) {
                setUser({
                    username: "",
                    email: "",
                    message: ""

                });
                const responseData = await response.json();
                alert("message send successfully");
                console.log(responseData);
            } else {
                // Handle API error here
                console.error("API Error:", response.status, response.statusText);
            }


        } catch (err) {
            console.log("this is contac err" + err);
        }
    }
    return (

        <>
            <div style={{ backgroundColor: "yellow", height: "60vh", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
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

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>message</Form.Label>
                        <Form.Control name='message' value={user.message} onChange={handleInput} type="textarea" placeholder="Enter message" />
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30155.349726936372!2d72.8403458344714!3d19.13314034866148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63b76f3de9b%3A0x1e1d1cd27f00b1f8!2sJogeshwari%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1717226458278!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>

    );
}

export default Contact;