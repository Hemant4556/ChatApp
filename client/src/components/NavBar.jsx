import {Container,Nav,Navbar,Stack} from "react-bootstrap";
import {Link} from "react-router-dom"
const NavBar = () => {
    return ( <Navbar bg="dark" className="mb-4" style={{height:"3.75rem"}}>
        <Container>
            <h2>
              <Link to="/" className="link-light text-decoration-none">ChatApp</Link>
            </h2>
            <span>Logged in as Hemant</span>
            <Nav>
                <Stack direction="horizontal" gap="3">
                    <Link to="/login" >Login</Link>
                    <Link to="/register" >Register</Link>
                </Stack>
            </Nav>
        </Container>
        </Navbar> );
}
 
export default NavBar;