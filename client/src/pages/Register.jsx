import { useContext } from "react";
import {Alert,Button,Form,Row,Col,Stack} from "react-bootstrap";
import { AuthContext } from '../context/AuthContext';

const Register = () => {
   const { registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading }= useContext( AuthContext );
    return ( 
    <>
    <Form onSubmit={registerUser}>
        <Row style={{
            height:"80vh",
            justifyContent:"center",
            paddingTop:"10%",
        }}>
            <Col xs="6">
            <Stack gap={3}>
                <h2>Register</h2>
                <Form.Control type="text" placeholder="Name" required />
                <Form.Control type="email" placeholder="Email" required/>
                <Form.Control type="password" placeholder="Password" required />
                <Button variant="primary" type="submit">
                    {isRegisterLoading? "Creating ":"Register"}
                </Button >
                { registerError?.error &&  (<Alert variant="danger">
                  <p>{registerError}</p>
                </Alert>
                )}
               
            </Stack>
            </Col>
        </Row>
    </Form>
    </> );
}
 
export default Register;