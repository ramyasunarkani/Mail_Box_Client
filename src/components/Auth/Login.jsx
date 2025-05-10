import React, { useRef, useState } from 'react';
import { RiEyeCloseLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';

const Login = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (!enteredEmail || !enteredPassword) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC6sE4ze0XmP0y0piOxaqTdvkzkxiiYdis',
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }
      );

      dispatch(authActions.login({
        token: res.data.idToken,
        name: res.data.displayName,  
        email: enteredEmail,
        }));

      emailRef.current.value = '';
      passwordRef.current.value = '';
      navigate('from');
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message
      ) {
        alert(`Login Failed: ${error.response.data.error.message}`);
      } else {
        alert(`An unexpected error occurred: ${error.message}`);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth-container">
      <div className='auth-heading'>
      <h2>Please Login Here!</h2>
        
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          ref={emailRef}
          required
        />
        <div className="password-field">
          <input
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            ref={passwordRef}
            required
          />
          <span onClick={() => setShow(!show)} className="eye-icon">
            {show ? <BsEye /> : <RiEyeCloseLine />}
          </span>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <button onClick={() => navigate('/signup')}>New User? <span>SignUp</span></button>
    </div>
  );
};

export default Login;
