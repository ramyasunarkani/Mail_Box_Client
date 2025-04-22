import React from 'react'
import { Button } from 'react-bootstrap'
import './Inbox.css'
import InboxAllMails from './InboxAllMails'
const Inbox = () => {
  return (
    <div className='mails-container'>
      <div className='mail-section'>
        <span>
          <Button>Compose</Button>
        </span>
        <span>
          Inbox
        </span>
        <span>
          Sent
        </span>

      </div>
      <div className='allmails'> 
      <InboxAllMails userEmail="ramya@gmail.com" />

      </div>
    </div>
  )
}

export default Inbox