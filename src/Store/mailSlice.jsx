import { createSlice } from '@reduxjs/toolkit';

const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    inbox: [],
    sent: [],
  },
  reducers: {
    setInbox(state, action) {
      state.inbox = action.payload;
    },
    setSent(state, action) {
      state.sent = action.payload;
    },
    addToInbox(state, action) {
      state.inbox.unshift(action.payload);
    },
    addToSent(state, action) {
      state.sent.unshift(action.payload);
    },
    markAsRead(state, action) {
      const mailId = action.payload;
      const mail = state.inbox.find((m) => m.id === mailId);
      if (mail) {
        mail.read = true;
      }
    },
    deleteMail(state, action) {
      const mailId = action.payload;
      state.inbox = state.inbox.filter(mail => mail.id !== mailId);
    },
    deleteSentMail(state, action) {
      const mailId = action.payload;
      state.sent = state.sent.filter(mail => mail.id !== mailId);
    }
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;

export const selectUnreadCount = (state) => {
  return state.mail.inbox.filter(mail => !mail.read).length;
};