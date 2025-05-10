import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteMail } from '../../Store/mailActions';
import { RiDeleteBinLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch } from 'react-redux';


const MailDetail = () => {
  const { mailId } = useParams();
  const navigate = useNavigate();
  const inbox = useSelector((state) => state.mail.inbox || []);
  const mail = inbox.find((item) => item.id === mailId);
  const dispatch=useDispatch();

  if (!mail) return <p>Mail not found</p>;
  const handleDeleteMail = () => {
    dispatch(deleteMail(mail.from, mail.id));
    console.log(mail.id);
    navigate('/mail-box/inbox'); 
  };


  return (
    <div className="mail-detail">
      <div className='mail-buttons'>
        <button onClick={() => navigate(-1)}><FaArrowLeft /></button>
        <button onClick={handleDeleteMail} >
        <RiDeleteBinLine />
        </button>
      </div>
      <h2>{mail.subject}</h2>
      <h4>From: {mail.userName} &lt;{mail.from}&gt;</h4>
      <p><strong>To:</strong> {mail.to}</p>
      <p><strong>Date:</strong> {new Date(mail.timestamp).toLocaleString()}</p>
      <div
        className="mail-body"
        dangerouslySetInnerHTML={{ __html: mail.content }}
      ></div>
    </div>
  );
};

export default MailDetail;
