import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './SentItems.css';
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteSentMail } from '../Store/mailActions';

const SentItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sent = useSelector((state) => state.mail?.sent || []);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const handleDelete = (e, mailId) => {
    e.stopPropagation(); 
    dispatch(deleteSentMail(userEmail, mailId));
  };

  const handleMailClick = (mailId) => {
    navigate(`/mail-box/sent/${mailId}`);
  };

  return (
    <div className="sent-container">
      {sent.length === 0 ? (
        <p>No sent emails.</p>
      ) : (
        sent.map((mail) => (
          <div
            key={mail.id}
            className="mail-preview"
            onClick={() => handleMailClick(mail.id)}
            style={{ cursor: 'pointer' }}
          >
            <div  className='preview-header'>
              <h4>To: {mail.to}</h4>
              <button
                className="delete-btn"
                onClick={(e) => handleDelete(e, mail.id)}
                title="Delete"
              >
                <RiDeleteBinLine />
              </button>
            </div>
            <p>
              {mail.subject} — {mail.content.replace(/<[^>]+>/g, '').slice(0, 40)}...
            </p>
            <span>{new Date(mail.timestamp).toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default SentItems;
