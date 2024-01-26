
import React, { useState,useEffect,useMemo } from 'react';
import { io } from "socket.io-client";
import './ChatWindow.css';
import { useParams } from 'react-router-dom';
import getAuthService from '../../../Services/auth.js'
import chatService from '../../../Services/chatService.js'

const ChatWindow = () => {
  const roomName=useParams().room;
  const [selectedRoom, setSelectedRoom] = useState(roomName);
  const [message, setMessage] = useState("");
  const[currentUser,setCurrentUser]=useState(null);
  const[messageList,setMessageList]=useState([]);
  const[roomList,setRoomList]=useState([]);
  
  const socket = useMemo(
    () =>
      io("http://localhost:5000", {
        allowEIO3: true 
      }),
     
    []
  );

  const handleSend = (e) => {
    e.preventDefault();
    socket.emit("send-message", {...currentUser,roomName:selectedRoom, message: message});
    setMessage("");
   
  };
  
 

  const rooms = ()=>{
    chatService.getRooms()
    .then((data)=>{

      if(data.status==200){
       
        let list=[];
        for (let key in data) {

          if (data[key]===1) {
            list.push(key);
            
          }
        }
      
       setRoomList(list);
      }

      
    })
  }
  

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const handleBackClick = () => {
    setSelectedRoom(null);
  };
 
  useEffect(() => {
    
    socket.on("connect", () => {
     
      console.log("connected", socket.id);
    });

     getAuthService.getCurrentUser()
    .then((user)=>{
    if(user.status==200){

      setCurrentUser(user);
      //fetch all rooms that user is in
      rooms();
      //join room
      
      socket.emit("join-room", { ...user, roomName: selectedRoom });
      //fetch all messages from room
      socket.on("receive-all-chats", (data) => {
        setMessageList(data);
      });
      
    }
  });
  //receive message
  socket.on("receive-message", (data) => {
    setMessageList((prevMessages) => [...prevMessages, ...data]);
    
  });
  return () => {
    socket.off("receive-message");
  };
  }, [selectedRoom]);
  
  return (
    <div className="chat-container">
      <div className={`contact-list ${selectedRoom ? 'open-chat' : ''}`}>
        {roomList.map((room) => (
          <div
            key={room}
            className={`contact-item ${selectedRoom === room ? 'selected' : ''}`}
            onClick={() => handleRoomClick(room)}
          >
            {/* <img
              src={`profile-pictures/${contact.id}.jpg`} // Replace with the actual path to the profile picture
              alt={room}
              className="profile-picture"
            /> */}
            <div className="contact-details">
              <h3 className="contact-name">{room}</h3>
              
            </div>
          </div>
        ))}
      </div>
      <div className={`chat-window ${selectedRoom ? 'open' : ''}`}>
        {selectedRoom ? (
          <>
            <div className={`chat-header ${window.innerWidth <= 767 ? 'with-back-arrow' : ''}`}>
              {window.innerWidth <= 767 && (
                <div className="back-arrow" onClick={handleBackClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                
                </div>
              )}
              {/* <img
                src={`profile-pictures/${selectedContact.id}.jpg`} // Replace with the actual path to the profile picture
                alt={selectedContact.name}
                className="profile-picture"
              /> */}
              <div className="contact-details">
                <h3 className="contact-name">{selectedRoom}</h3>
                
              </div>
            </div>
            <div className="chat-messages">
              {
                 messageList.map((message, index) => (
                  (currentUser.email === message.email) ? (
                    <div key={index} className="message incoming">
                      <p className="message-text">
                        <strong>{message.username}:</strong> {message.message}
                      </p>
                    </div>
                  ) : (
                    <div key={index} className="message outgoing">
                      <p className="message-text">
                        <strong>{message.username}:</strong> {message.message}
                      </p>
                    </div>
                  )
                ))
                
               }
              
             
            </div>
            <div className="chat-input">
              <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type a message" className="message-input" />
              <button onClick={handleSend} className="send-button">Send</button>
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
