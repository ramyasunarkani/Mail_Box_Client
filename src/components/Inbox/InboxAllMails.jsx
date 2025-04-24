import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './InboxAllMails.css';

const InboxAllMails = ({ userEmail }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const baseURL = 'https://mail-box-client-a261b-default-rtdb.firebaseio.com';

  useEffect(() => {
    if (!userEmail) {
      console.warn("User email is not provided");
      setLoading(false);
      return;
    }

    const receiverPath = userEmail.replace(/[.@]/g, '');

    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${baseURL}/inbox/${receiverPath}.json`);
        const emailData = response.data || {};
        const loadedEmails = Object.entries(emailData).map(([id, mail]) => ({
          id,
          ...mail,
        }));
        setEmails(loadedEmails.reverse());
      } catch (err) {
        console.error('Error fetching emails:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [userEmail]);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  if (!userEmail) {
    return <p>Error: No user email provided.</p>;
  }

  return (
    <div className="inbox-container">
      <h2>Your Inbox</h2>
      {loading ? (
        <p>Loading mails...</p>
      ) : selectedEmail ? (
        <div className="email-detail">
          <button onClick={handleBack} className="back-button">← Back</button>
          <h3>{selectedEmail.subject}</h3>
          <p><strong>From:</strong> {selectedEmail.from}</p>
          <p><strong>Date:</strong> {new Date(selectedEmail.timestamp).toLocaleString()}</p>
          <div
            className="email-body"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(selectedEmail.body),
            }}
          />
        </div>
      ) : emails.length === 0 ? (
        <p>No mails found.</p>
      ) : (
<ul className="email-list">
  {emails.map((email) => {
    const isShortSubject = email.subject.length < 20;
    const previewText = isShortSubject && email.body
      ? `${email.subject} - ${email.body.slice(0, 50)}${email.body.length > 50 ? '...' : ''}`
      : email.subject;

    return (
      <li key={email.id} className="email-item" onClick={() => handleEmailClick(email)}>
        <div className="email-header">
          {email.from}
          <span className="email-date">
            {new Date(email.timestamp).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="email-preview-single-line">{previewText}</div>
      </li>
    );
  })}
</ul>
      )}
    </div>
  );
};

export default InboxAllMails;
