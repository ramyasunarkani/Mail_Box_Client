import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";

import { deleteMail, markAsRead } from '../../Store/mailActions';
import './Inbox.css'

const Inbox = () => {
  const inbox = useSelector((state) => state.mail?.inbox || []);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMailClick = (mail) => {
    if (!mail.read) {
      dispatch(markAsRead(userEmail, mail.id));  
    }
    navigate(`/mail-box/inbox/${mail.id}`);
  };
  const handleDeleteMail = (mailId) => {
    dispatch(deleteMail(userEmail, mailId));
  };

  return (
    <div className="inbox-container">
      {inbox.map((mail) => (
        <div
          key={mail.id}
          className="mail-preview"
          onClick={() => handleMailClick(mail)}
          style={{ cursor: 'pointer' }}
        >
          <div className='preview-header'>
           <h4>
           {!mail.read && <span className="blue-dot"></span>}  
           {mail.userName}
           </h4>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation(); 
                handleDeleteMail(mail.id);
              }}
            >
              <RiDeleteBinLine />
            </button>
          </div>
          <p>
            {mail.subject} — {mail.content.replace(/<[^>]+>/g, '').slice(0, 40)}...
          </p>
          <span>{new Date(mail.timestamp).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
