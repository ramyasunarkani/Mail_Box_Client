import React, { useState } from 'react';
import './NavBar.css';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../Store/auth';

const NavBar = () => {
  const userName=useSelector((state)=>state.auth.userName)
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch=useDispatch();

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    setShowDropdown(false);
  };
  
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>MailBoxClient</h2>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Search mails..." className="search-input" />
      </div>

      <div className="navbar-right">
        <FaUserCircle className="profile-icon" onClick={handleProfileClick} />

        {showDropdown && (
          <div className="profile-dropdown">
                <p className="username"> {userName}</p>
                <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
