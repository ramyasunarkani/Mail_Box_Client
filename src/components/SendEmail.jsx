import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../Store/appSlice';
import './SendEmail.css';
import { RxCross2 } from 'react-icons/rx';
import { sendEmail } from '../Store/mailActions';

const SendEmail = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.app.open); 
  const senderEmail = useSelector((state) => state.auth.userEmail); 
  const userName = useSelector((state) => state.auth.userName); 

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'to') setTo(value);
    if (name === 'subject') setSubject(value);
  };

  const handleSend = async () => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const sanitizedHtml = DOMPurify.sanitize(content);
  
    if (!to || !subject || !sanitizedHtml.trim()) {
      toast.error('All fields are required');
      return;
    }
  
    setLoading(true);
    try {
      await dispatch(sendEmail(senderEmail, {
        userName,
        to,
        subject,
        content: sanitizedHtml,
      }));
  
      toast.success('Email sent successfully!');
      setTo('');
      setSubject('');
      setEditorState(EditorState.createEmpty());
      dispatch(setOpen(false));
    } catch (error) {
      toast.error('Failed to send email');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (!open) return null;

  return (
    <div className={`compose-container ${open ? 'open' : ''}`}>
      <div className="header">
        <p>New Message</p>
        <div onClick={() => dispatch(setOpen(false))} className="close-btn">
          <RxCross2 />
        </div>
      </div>

      <input
        type="email"
        name="to"
        placeholder="To"
        value={to}
        onChange={changeEventHandler}
        className="compose-input"
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={subject}
        onChange={changeEventHandler}
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

export default SendEmail;
