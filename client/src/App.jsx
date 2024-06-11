import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Service } from "./pages/Service";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { Error } from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminUser } from "./pages/AdminUser";
import { AdminContact } from "./pages/AdminContact";
import { AdminEdit } from "./pages/AdminEdit";

const App = () => {
  return <>
    <BrowserRouter>
      <NavigationBar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/user/:userId/edit" element={<AdminEdit/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="user" element={<AdminUser />} />
          <Route path="contact" element={<AdminContact />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </>
}
export default App;