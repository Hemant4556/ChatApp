import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
// import './index.css';
import Login from "./pages/Login";
import NavBar from "./components/NavBar.jsx";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
    <NavBar />
  <Container className="text-secondry">
    <Routes> 
      <Route path="/" element={<Chat />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
    </>
    );
}

export default App;