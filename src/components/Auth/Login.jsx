import React, { useRef, useState } from 'react';
import { Container, Form, Button, Card, InputGroup } from 'react-bootstrap';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';

const Login = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
      dispatch(authActions.login({token: response.data.idToken}))

      navigate('/home');
      emailRef.current.value = '';
      passwordRef.current.value = '';
    } catch (error) {
      console.error(error.response?.data?.error?.message || error.message);
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
            
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  ref={passwordRef}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <Button type="submit" className="w-100 mb-2" variant="primary">
              Login
            </Button>

            <Button
              type="button"
              variant="light"
              className="w-100 border"
              onClick={() => navigate('/signUp')}
            >
              Don't have an account? Sign Up
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
