import React, { useRef, useState } from 'react';
import { RiEyeCloseLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import './Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const confirmedPassword = confirmRef.current.value;

    if (!enteredName || !enteredEmail || !enteredPassword || !confirmedPassword) {
      alert("All fields are required.");
      return;
    }

    if (enteredPassword !== confirmedPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC6sE4ze0XmP0y0piOxaqTdvkzkxiiYdis',
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }
      );

      const idToken = res.data.idToken;
      console.log(res.data)

      await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC6sE4ze0XmP0y0piOxaqTdvkzkxiiYdis',
        {
          idToken: idToken,
          displayName: enteredName,
          returnSecureToken: false,
        }
      );

      dispatch(authActions.login(idToken));
      navigate('/login');
    } catch (error) {
      const msg =
        error?.response?.data?.error?.message || "Something went wrong!";
      alert(`Sign Up Failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-heading">
        <h2>Create Your Account</h2>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          ref={nameRef}
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          ref={emailRef}
          required
        />

        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            ref={passwordRef}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
            {showPassword ? <BsEye /> : <RiEyeCloseLine />}
          </span>
        </div>

        <div className="password-field">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            ref={confirmRef}
            required
          />
          <span onClick={() => setShowConfirm(!showConfirm)} className="eye-icon">
            {showConfirm ? <BsEye /> : <RiEyeCloseLine />}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <button onClick={() => navigate('/login')}>
        Already a user? <span>Sign In</span>
      </button>
    </div>
  );
};

export default SignUp;
