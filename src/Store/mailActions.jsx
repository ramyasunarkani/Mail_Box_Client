import axios from 'axios';
import { mailActions } from './mailSlice';

const FIREBASE_URL = 'https://mail-box-client-a261b-default-rtdb.firebaseio.com';

const sanitizeEmail = (email) => {
  if (typeof email !== 'string') {
    throw new Error('Invalid email: expected string but got ' + typeof email);
  }
  return email.replace(/[.@]/g, '');
};

export const fetchInboxEmails = (userEmail) => {
  return async (dispatch) => {
    try {
      if (!userEmail) throw new Error('No user email provided');
      const emailKey = sanitizeEmail(userEmail);

      const res = await axios.get(`${FIREBASE_URL}/inbox/${emailKey}.json`);
      const data = res.data || {};

      const inboxMails = Object.entries(data).map(([id, val]) => ({
        id,
        ...val,
      }));

      dispatch(mailActions.setInbox(inboxMails.reverse()));
    } catch (err) {
      console.error('Error fetching inbox mails:', err);
    }
  };
};

export const fetchSentEmails = (userEmail) => {
  return async (dispatch) => {
    try {
      if (!userEmail) throw new Error('No user email provided');
      const emailKey = sanitizeEmail(userEmail);

      const res = await axios.get(`${FIREBASE_URL}/sent/${emailKey}.json`);
      const data = res.data || {};

      const sentMails = Object.entries(data).map(([id, val]) => ({
        id,
        ...val,
      }));

      dispatch(mailActions.setSent(sentMails.reverse()));
    } catch (err) {
      console.error('Error fetching sent mails:', err);
    }
  };
};

export const sendEmail = (senderEmail, emailData) => {
    return async (dispatch) => {
      try {
        if (!senderEmail || !emailData?.to) {
          throw new Error('Missing sender or receiver email');
        }
  
        const sanitizedSender = sanitizeEmail(senderEmail);
        const sanitizedReceiver = sanitizeEmail(emailData.to);
  
        const payload = {
          ...emailData,
          from: senderEmail,
          timestamp: new Date().toISOString(),
          read: false,
        };
  
        await axios.post(`${FIREBASE_URL}/inbox/${sanitizedReceiver}.json`, payload);
  
        const res = await axios.post(`${FIREBASE_URL}/sent/${sanitizedSender}.json`, payload);
  
        const sentMailWithId = {
          id: res.data.name,
          ...payload,
        };
  
        dispatch(mailActions.addToSent(sentMailWithId));
      } catch (err) {
        console.error('Error sending mail:', err);
      }
    };
  };

  export const markAsRead = (userEmail, mailId) => {
    return async (dispatch) => {
      const sanitizedEmail = sanitizeEmail(userEmail);  
      const url = `${FIREBASE_URL}/inbox/${sanitizedEmail}/${mailId}.json`;  
  
      try {
        await axios.patch(url, { read: true });  
        dispatch(mailActions.markAsRead(mailId));  
      } catch (error) {
        console.error('Failed to mark mail as read:', error);  
      }
    };
  };
  export const deleteMail = (userEmail, mailId) => {
    return async (dispatch) => {
      const sanitizedEmail = sanitizeEmail(userEmail);
      const url = `${FIREBASE_URL}/inbox/${sanitizedEmail}/${mailId}.json`;
  
      try {
        await axios.delete(url);
        dispatch(mailActions.deleteMail(mailId));
      } catch (error) {
        console.error('Failed to delete mail:', error);
      }
    };
  };
  export const deleteSentMail = (userEmail, mailId) => {
    return async (dispatch) => {
      const sanitizedEmail = sanitizeEmail(userEmail);
      const url = `${FIREBASE_URL}/sent/${sanitizedEmail}/${mailId}.json`;
  
      try {
        await axios.delete(url);
        dispatch(mailActions.deleteSentMail(mailId));
      } catch (error) {
        console.error('Error deleting sent mail:', error);
      }
    };
  };
  
  
