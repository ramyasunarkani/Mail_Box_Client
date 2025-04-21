import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MailCompose from './components/MailCompose';
import { authActions } from './Store/auth';
function App() {
    const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    let timeout;
    const resetTimeout = () => {
      if (isLoggedIn) {
        // Set timeout for 5 minutes of inactivity
        timeout = setTimeout(() => {
          dispatch(authActions.logout());  // Dispatch the logout action
        }, 5 * 60 * 1000);  // 5 minutes in milliseconds
      }
    };

    // Reset timeout when user interacts
    const handleUserActivity = () => {
      clearTimeout(timeout);
      resetTimeout();  // Restart the timer when user interacts
    };

    // Attach event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);

    resetTimeout();  // Initialize the timeout

    // Cleanup event listeners when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      clearTimeout(timeout);  // Clear timeout on cleanup
    };
  }, [dispatch, isLoggedIn]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/home" />} />
        <Route path="/signUp" element={!isLoggedIn ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/home" element={isLoggedIn ? <MailCompose /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}


export default App;
