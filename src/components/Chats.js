import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import db from '../config/firebaseconfig';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from './StateProvider';

const Chats = () => {
  let[seed, setSeed] = useState('0')
  let[input, setInput] = useState("")
  let[messages, setMessages] = useState([])
  const {roomId} = useParams()
  const[roomName, setRoomName] = useState('')
  const[{user}, dispatch] = useStateValue()

  useEffect(()=>{
    const data = async()=>{
      if(roomId){
        if (roomId) {
          const roomRef = doc(db, 'rooms', roomId);
          onSnapshot(roomRef, (snapshot) => {
            setRoomName(snapshot.data().name);
    
            const messagesRef = collection(roomRef, 'messages');
            const orderedMessages = query(messagesRef, orderBy('timestamp', 'asc'));
            // console.log(messagesRef)
            onSnapshot(orderedMessages, (snapshot) => {
              // console.log(snapshot)
              return setMessages(snapshot.docs.map((doc) => {
                // console.log(doc.data())
                return doc.data()
              }));
            });
          });
        }
      }
    }

    data()
   
  },[roomId])

  // console.log(messages)

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000))
  },[roomId])

  const sendMessage = (e)=>{
    e.preventDefault()
    const roomRef = doc(db, "rooms", roomId)
    const messagesRef = collection(roomRef, "messages")
  
    addDoc(messagesRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp()
    })

    setInput("")
  }

  return (
    <div className='chat'>
      <div className="chatheader">
        <IconButton>
          <Avatar src={`https://api.dicebear.com/api/human/${seed}.svg`} /> 
        </IconButton>
        <div className="chatheaderinfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at...
            {
              new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
            }
          </p>  
        </div>
          <div className="chatheaderright">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
      </div>
      <div className="chatbody">
        {
          Array.isArray(messages) &&
          messages.map((message)=>{
            return <>
                <p className={`chatmsg ${message.name === user.displayName && 'chatmsgrecieve'}`}>
                  <span className='chatname'>{message.name}</span>
                  {message.message}
                  <span className='chattimestamp'>
                  {
                    new Date(message.timestamp?.toDate()).toUTCString()
                  }
                  </span>
                </p>
            </>
          })
        }
      
       
      </div>
      <form onSubmit={sendMessage}>
      <div className="chatfooter">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton>
            <AttachFileIcon />  
        </IconButton>
        <input type="text" name="" value={input} onChange={(e)=>setInput(e.target.value)}  />
        <button type='submit' className='nonebtn'>
        <IconButton>
          <SendIcon />
        </IconButton>
        </button>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
      </form>
    </div>
  )
}

export default Chats