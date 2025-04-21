import React from 'react';
import { Container, Form, Button, Card, FloatingLabel } from 'react-bootstrap';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="main-wrapper">
      <div className="curve-shape"></div>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="p-4 signup-card">
          <h4 className="text-center mb-3">SignUp</h4>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control type="email" placeholder="Email" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingCpassword" label="Confirm Password" className="mb-3">
              <Form.Control type="password" placeholder="Confirm Password" />
            </FloatingLabel>
            <Button className="w-100 mb-2" variant="primary">
              Sign up
            </Button>
            <Button variant="light" className="w-100 border">
              Have an account? Login
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default SignUp;
