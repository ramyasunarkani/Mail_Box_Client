import React from 'react';
import './App.css';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
