import { Navigate, Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../store/auth';
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";


export const AdminLayout = () => {
    const {userDetail,isLoading } = useAuth();
    console.log("isloading:"+isLoading);
    if(isLoading){
        return <h1>Loading.......</h1>

    }
    console.log("userdetail:"+userDetail.isAdmin)
    if(!userDetail.isAdmin){
        return <Navigate to="/"/>
    }
    // const { isLoggedIn } = useAuth();

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/admin/user">
                                <FaUser />

                                user</Nav.Link>
                            <Nav.Link href="/admin/contact">
                                <FaMessage />

                                Contact</Nav.Link>

                            <Nav.Link href="/service"><FaRegListAlt />
                                Services</Nav.Link>

                            <Nav.Link href="/"><FaHome />
                            Home</Nav.Link>






                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    )
}