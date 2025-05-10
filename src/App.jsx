import React, { useEffect } from 'react'; // <- Add useEffect
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';
import MailBox from './components/MailBox';
import Inbox from './components/Inbox/Inbox';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInboxEmails, fetchSentEmails } from './Store/mailActions'; // <- Import action
import MailDetail from './components/Inbox/MailDetail';
import SentItems from './components/SentItems';
import SentMailDetail from './components/SentMailDetail';

const App = () => {
  const dispatch = useDispatch(); // <- Add dispatch
  const userLogged = useSelector((state) => state.auth.userLogged);
  const userEmail = useSelector((state) => state.auth.userEmail); 

  useEffect(() => {
    let intervalId;

    if (userEmail) {
      // Initial fetch
      dispatch(fetchInboxEmails(userEmail));
      dispatch(fetchSentEmails(userEmail));

      // Polling every 2 seconds
      intervalId = setInterval(() => {
        dispatch(fetchInboxEmails(userEmail));
        dispatch(fetchSentEmails(userEmail));
      }, 2000);
    }

    // Cleanup on unmount or user logout
    return () => clearInterval(intervalId);
  }, [dispatch, userEmail]);

  return (
    <Routes>
      <Route path="/login" element={userLogged ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={userLogged ? <Navigate to="/" /> : <SignUp />} />
      <Route path="/" element={userLogged ? <Home /> : <Navigate to="/login" />} />

      {userLogged && (
        <Route path="/mail-box" element={<MailBox />}>
          <Route index element={<Navigate to="inbox" />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="inbox/:mailId" element={<MailDetail />} /> {/* <- Add MailDetail route */}
          <Route path="sent" element={<SentItems />} />
          <Route path="sent/:mailId" element={<SentMailDetail />} />
        </Route>
      )}
      {!userLogged && <Route path="*" element={<Navigate to="/login" />} />}
    </Routes>
  );
};

export default App;
