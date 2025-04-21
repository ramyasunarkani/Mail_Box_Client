import React, { useRef } from 'react';
import { Container, Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const navigate=useNavigate();
  const emailRef=useRef(null);
  const passwordRef=useRef(null);
  async function submitHandler(event) {
  event.preventDefault();
  const EnteredEmail = emailRef.current.value;
  const EnteredPassword = passwordRef.current.value;

  try {
    const response = await axios.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6sE4ze0XmP0y0piOxaqTdvkzkxiiYdis',
      {
        email: EnteredEmail,
        password: EnteredPassword,
        returnSecureToken: true,
      }
    );

    console.log('Login Success ✅:', response.data);
    navigate('/home')
    emailRef.current.value = '';
    passwordRef.current.value = '';

    

  } catch (error) {
    console.error( error.response?.data?.error?.message || error.message);
    alert(error.response?.data?.error?.message || 'Authentication failed!');
  }
}

  return (
    <div className="main-wrapper">
      <div className="curve-shape"></div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 login-card">
          <h4 className="text-center mb-3">Login</h4>
          <Form onSubmit={submitHandler}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="Email" ref={emailRef} required/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
            </FloatingLabel>
            <Button 
            type='submit'
            className="w-100 mb-2" variant="primary">
              Login
            </Button>
            
          </Form>
          <Button 
          type='button'
          variant="light" className="w-100 border"
           onClick={()=>navigate('/signUp')}>
              Don't have an account? Sign Up
            </Button>
        </Card>
        
      </Container>
    </div>
  );
};

export default Login;
