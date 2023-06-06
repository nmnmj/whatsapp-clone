import React, { useEffect, useState } from 'react'
import './Sidebarchat.css'
import { Avatar } from '@mui/material'
import db from '../config/firebaseconfig'
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'

const SidebarChat = ({addnewchat, name, id}) => {
  let[seed, setSeed] = useState('0')
  const [ messages, setMessages] = useState([])
  const[{user}, dispatch] = useStateValue()

  useEffect(()=>{
    if(id){
      const roomRef = doc(db, "rooms", id)
      const messagesRef = collection(roomRef, "messages")
      const orderedMessages = query(messagesRef, orderBy('timestamp', 'desc'));
      onSnapshot(orderedMessages, (snapshot)=>{
        return setMessages(snapshot.docs.map((doc)=>{
          return doc.data()
        }))
      })
    }
  },[id])

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000))
  },[])

  const createChat = async ()=>{
      const roomName = prompt("Please enter name for Chat Room")
      if(roomName){
        try {
          const roomsCollection = collection(db, 'rooms');
          
          await addDoc(roomsCollection, {
            name: roomName,
          });
      
        } catch (error) {
          alert('Error creating room: ', error);
        }
      }
  }

  const createoneChat = async ()=>{
    console.log(user)
    console.log(user.email)
    const reciever = prompt("Enter the email id whom you want to message.")
    if(reciever){
      try {
        const roomsCollection = collection(db, "rooms")
        const roomId = user.email+","+reciever
        console.log(roomId)
        const roomDocRef = doc(roomsCollection, roomId)
        const docRef = await setDoc(doc(db, "rooms", roomId), {
          name: reciever
        });
        // await addDoc(roomDocRef, {
        //   name: reciever
        // })
        // await setDoc(doc(roomDocRef, roomId))
      } catch (error) {
        alert("Error", error)
      }
    }
  }

  return !addnewchat ? (
    <Link to={`/rooms/${id}`} className='nolink'>
      <div className='sidebarchat'>
          <Avatar src={`https://api.dicebear.com/api/human/${seed}.svg`} />
          <div className="chatinfo">
            <div className='chattext'>
            <h3>{name}</h3>
            <small>
              {
                messages.length>0 ?
                messages[0]?.message
                :
                "No Messages Yet"
              }
            </small>
            </div>
          </div>
      </div>
    </Link>
  ) :
  <>
  <div onClick={createChat} className='sidebarchat'>
    <h3>Add New Room</h3>
  </div>
  <div onClick={createoneChat} className='sidebarchat'>
    <h3>Create One to One Chat</h3>
  </div>
  </>
}

export default SidebarChat