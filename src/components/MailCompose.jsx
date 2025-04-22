import React, { useState, useEffect, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';
import './MailCompose.css'; // 👈 Import your CSS file here

const MailCompose = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const senderEmail = 'ramyasunarkani23@gmail.com';
  const baseURL = 'https://mail-box-client-a261b-default-rtdb.firebaseio.com';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSend();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [to, subject, editorState]);

  const handleSend = async () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const htmlBody = draftToHtml(rawContent);
    const safeHtmlBody = DOMPurify.sanitize(htmlBody);

    if (!to || !subject || !safeHtmlBody || safeHtmlBody === '<p></p>\n') {
      toast.warning('All fields are required!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const timestamp = new Date().toISOString();
    const mailId = Date.now();

    const mailDataForSender = {
      to,
      subject,
      body: safeHtmlBody,
      timestamp,
    };

    const mailDataForReceiver = {
      from: senderEmail,
      subject,
      body: safeHtmlBody,
      timestamp,
    };

    try {
      const receiverPath = to.replace(/[.@]/g, '');
      if (isMounted.current) {
        await axios.put(`${baseURL}/sent/${mailId}.json`, mailDataForSender);
        await axios.put(`${baseURL}/inbox/${receiverPath}/${mailId}.json`, mailDataForReceiver);
        toast.success('Mail Sent Successfully!');
        setTo('');
        setSubject('');
        setEditorState(EditorState.createEmpty());
      }
    } catch (error) {
      if (isMounted.current) {
        console.error('Error sending mail:', error);
        toast.error('Failed to send mail.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="compose-container">
      <h2>Compose Mail</h2>
      <input
        type="email"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="compose-input"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="compose-input"
      />
          <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}
      wrapperClassName="editor-wrapper"
      editorClassName="compose-editor"
      toolbarClassName="editor-toolbar"
    />

      <button
        onClick={handleSend}
        className="compose-button"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default MailCompose;
