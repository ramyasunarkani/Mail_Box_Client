import React from 'react'
import NavBar from './Layout/NavBar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import SendEmail from './SendEmail'

const MailBox = () => {
  return (
   <>
    <NavBar/>
    <Sidebar/>
    <SendEmail />
    <div style={{ marginLeft: '220px', marginTop: '30px', padding: '1rem', flex: 1 }}>
    <Outlet/>
    </div>
   
   </>
  )
}

export default MailBox