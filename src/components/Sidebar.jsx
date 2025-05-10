import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../Store/appSlice'; 
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import { selectUnreadCount } from '../Store/mailSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const unreadCount = useSelector(selectUnreadCount);

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <button
          className="sidebar-button"
          onClick={() => dispatch(setOpen(true))}
        >
          Compose
        </button>
      </div>
      <div className="sidebar-links">
        <NavLink
          to="/mail-box/inbox"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active-link' : 'sidebar-link'
          }
        >
          Inbox
          {unreadCount > 0 && (
            <span className="unread-count">{unreadCount}</span>
          )}
        </NavLink>
        <NavLink
          to="/mail-box/sent"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active-link' : 'sidebar-link'
          }
        >
          Sent
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
