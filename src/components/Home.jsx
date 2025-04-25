import React from 'react'

const Home = () => {
  return (
    <div className="home-container">
  
<img src="/welocome.png" alt="image" width="200" height="200" />
  <p>Your private, minimal, and secure mailbox system.</p>

  <button onClick={() => navigate('/inbox')} className="go-to-mails-btn">
    Click here to go to Mails Section
  </button>

  <div className="advice-section">
    <h3> Tips to Get Started</h3>
    <ul>
      <li>Use "Compose" to send a new message</li>
      <li> "Inbox" shows all received messages</li>
      <li>Mark emails as read to stay organized</li>
      <li>Your emails are securely stored using Firebase</li>
    </ul>
  </div>
</div>

  )
}

export default Home