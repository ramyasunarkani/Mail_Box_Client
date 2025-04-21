import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'; // Importing Axios
import 'react-quill/dist/quill.snow.css';

const MailCompose = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const senderEmail = 'ramyasunarkani23@gmail.com'; // Change to dynamic user login if needed

  const handleSend = async () => {
    if (!to || !subject || !body) {
      alert('All fields are required!');
      return;
    }

    const mailId = uuidv4();
    const timestamp = new Date().toISOString();
    const baseURL = 'https://mail-box-client-a261b-default-rtdb.firebaseio.com'; // Removed trailing slash

    const mailDataForSender = {
      to,
      subject,
      body,
      timestamp,
    };

    const mailDataForReceiver = {
      from: senderEmail,
      subject,
      body,
      timestamp,
    };

    try {
      // Use Axios for the PUT request
      await axios.put(`${baseURL}/sent/${mailId}.json`, mailDataForSender, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await axios.put(`${baseURL}/inbox/${mailId}.json`, mailDataForReceiver, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Mail Sent Successfully!');
      setTo('');
      setSubject('');
      setBody('');
    } catch (error) {
      console.error('Error sending mail:', error);
      alert('Failed to send mail.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h2>Compose Mail</h2>
      <input
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <ReactQuill
        theme="snow"
        value={body}
        onChange={setBody}
        style={{ height: '200px', marginBottom: '1rem' }}
      />
      <button onClick={handleSend} style={{ padding: '0.7rem 1.5rem' }}>
        Send
      </button>
    </div>
  );
};

export default MailCompose;
