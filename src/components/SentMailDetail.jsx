import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteSentMail } from '../Store/mailActions';


const SentMailDetail = () => {
  const { mailId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector((state) => state.auth.userEmail);
  const mail = useSelector((state) =>
    state.mail.sent.find((m) => m.id === mailId)
  );

  if (!mail) return <div>Mail not found.</div>;
  const handleDelete = () => {
    dispatch(deleteSentMail(userEmail, mail.id));
    navigate('/mail-box/sent');
  };

  return (
    <div className="mail-detail">
      <div className='mail-buttons'>
      <button onClick={() => navigate(-1)}><FaArrowLeft /></button>
       <button onClick={(e) => handleDelete(e, mail.id)} title="Delete" >
        <RiDeleteBinLine/>
      </button>
      </div>
      <h2>{mail.subject}</h2>
      <h4>To: {mail.to}</h4>
      <div dangerouslySetInnerHTML={{ __html: mail.content }} />
      <span>{new Date(mail.timestamp).toLocaleString()}</span>
    </div>
  );
};

export default SentMailDetail;
