import React, { useRef } from 'react';
import { Container, Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {
  const navigate=useNavigate();
  const emailRef=useRef(null);
  const passwordRef=useRef(null);
  const cpassRef=useRef(null);
  
  function submitHandler(event){
    event.preventDefault();
    const enteredEmail=emailRef.current.value;
    const enteredPass=passwordRef.current.value;
    const enteredCofPass=cpassRef.current.value;
    if(enteredPass !== enteredCofPass){
      alert('Password not Match');
      return;
    }
    try{
      const res=axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6sE4ze0XmP0y0piOxaqTdvkzkxiiYdis',{
        email:enteredEmail,
        password:enteredPass,
        returnSecureToken:'true'
      })
      emailRef.current.value='';
      passwordRef.current.value='';
      cpassRef.current.value='';
      navigate('/login');
      
    }
    catch(error){
      console.error( error.response?.data?.error?.message || error.message);
    alert(error.response?.data?.error?.message || 'SignUp failed!');

    }


  }

  return (
    <div className="main-wrapper">
      <div className="curve-shape"></div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 signup-card">
          <h4 className="text-center mb-3">SignUp</h4>
          <Form onSubmit={submitHandler}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="Email" ref={emailRef} required/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingCpassword" label="Confirm Password" className="mb-3">
              <Form.Control type="password" placeholder="Confirm Password" ref={cpassRef}/>
            </FloatingLabel>
            <Button type='submit' className="w-100 mb-2" variant="primary">
              Sign up
            </Button>
            <Button variant="light" className="w-100 border"
            onClick={()=>navigate('/login')}
            >
              Have an account? Login
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
