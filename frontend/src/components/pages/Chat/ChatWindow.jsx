// ChatWindow.jsx

import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const contacts = [
    { id: 1, name: 'John Doe', lastSeen: 'Last seen recently' },
    { id: 2, name: 'Jane Smith', lastSeen: 'Online' },
   
    // Add more contacts as needed
  ];

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="chat-container">
      <div className={`contact-list ${selectedContact ? 'open-chat' : ''}`}>
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-item ${selectedContact === contact ? 'selected' : ''}`}
            onClick={() => handleContactClick(contact)}
          >
            <img
              src={`profile-pictures/${contact.id}.jpg`} // Replace with the actual path to the profile picture
              alt={contact.name}
              className="profile-picture"
            />
            <div className="contact-details">
              <h3 className="contact-name">{contact.name}</h3>
              <span className="last-seen">{contact.lastSeen}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={`chat-window ${selectedContact ? 'open' : ''}`}>
        {selectedContact ? (
          <>
            <div className="chat-header">
              <img
                src={`profile-pictures/${selectedContact.id}.jpg`} // Replace with the actual path to the profile picture
                alt={selectedContact.name}
                className="profile-picture"
              />
              <div className="contact-details">
                <h3 className="contact-name">{selectedContact.name}</h3>
                <span className="last-seen">{selectedContact.lastSeen}</span>
              </div>
            </div>
            <div className="chat-messages">
              {/* Render chat messages here */}
              <div className="message incoming">
                <p className="message-text">Hello!</p>
                
              </div>
              <div className="message outgoing">
                <p className="message-text">Hi there!</p>
              </div>
              {/* Add more messages as needed */}
            </div>
            <div className="chat-input">
              <input type="text" placeholder="Type a message" className="message-input" />
              <button className="send-button">Send</button>
            </div>
          </>
        ) : (
          <div className="select-contact-message">
            <p>Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
