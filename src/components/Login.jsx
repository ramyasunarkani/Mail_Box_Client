import React from 'react';
import { Container, Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  return (
    <div className="main-wrapper">
      <div className="curve-shape"></div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 signup-card">
          <h4 className="text-center mb-3">Login</h4>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="Email" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <Button className="w-100 mb-2" variant="primary">
              Login
            </Button>
            <Button variant="light" className="w-100 border">
              Don't have an account? Sign Up
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
