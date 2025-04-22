import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './InboxAllMails.css'; // Style as needed

const InboxAllMails = ({ userEmail }) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (!userEmail) {
    return <p>Error: No user email provided.</p>;
  }

  return (
    <div className="inbox-container">
      <h2>Your Inbox</h2>
      {loading ? (
        <p>Loading mails...</p>
      ) : emails.length === 0 ? (
        <p>No mails found.</p>
      ) : (
        <ul className="email-list">
          {emails.map(({ id, from, subject, body, timestamp }) => (
            <li key={id} className="email-item">
              <div className="email-header">
                 {from}{'   '}
              <span className="email-date">
                {new Date(timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              </div>
              <div className="email-subject">
                {subject}
              </div>
              {/* <div
                className="email-body"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(body),
                }}
              /> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InboxAllMails;
