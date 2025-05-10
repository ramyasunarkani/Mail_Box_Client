import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img src="/welocome.png" alt="Welcome" className="home-image" />

      <p className="home-description">
        Your private, minimal, and secure mailbox system.
      </p>

      <button onClick={() => navigate('/mail-box')} className="go-to-mails-btn">
        Click here to go to Mails Section
      </button>

      <div className="advice-section">
        <h3>Tips to Get Started</h3>
        <ul>
          <li>Use <strong>"Compose"</strong> to send a new message</li>
          <li><strong>"Inbox"</strong> shows all received messages</li>
          <li>Mark emails as read to stay organized</li>
          <li>Your emails are securely stored using Firebase</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
