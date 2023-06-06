import '../Sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import FilterListIcon from '@mui/icons-material/FilterList';
import Groups2Icon from '@mui/icons-material/Groups2';
import db from '../config/firebaseconfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { useStateValue } from './StateProvider';


const Navbar = () => {
  const [rooms, setRooms] = useState([])
  // const [otos, setOtos] = useState([])
  const[{user}, dispatch] = useStateValue()
  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          // console.log(doc.data())
          // console.log(doc.id)
          if(doc.id.includes(",")){
            let docid = doc.id.split(",")
            // console.log(docid[0])
            if(docid[1] == user.email){
              return {
                id: doc.id,
                data: doc.data(),
              }
            }
            if((docid[0]) != user.uid){
              return false
            }
          }
          return {
            id: doc.id,
            data: doc.data(),
          }
        })
      );
    });

    return ()=>{
      unsubscribe()
    }

  },[])

  // console.log(user.email)

  return (
    <>
    <div className='sidebarmain'>
      <div className='sidebarheader'>
          <IconButton>
            <Avatar src={user.photoURL} />
          </IconButton>
        <div className="sidebarheaderright">
          <IconButton>
            <Groups2Icon />
          </IconButton>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebarsearch">
        <div className="searchcontainer">
        <IconButton>
        <SearchOutlined />
        </IconButton>
        <input type="text" name="" placeholder='Search or start new chat' />
        </div>
        <IconButton>
        <FilterListIcon />
        </IconButton>
      </div>
      <div className="contacts">
        <SidebarChat addnewchat />
        {/* {
          rooms.map(room=>{
            return <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          })
        } */}
      {
        rooms.map(room => {
          if (room.data && room.data.name) {
            return <SidebarChat key={room.id} id={room.id} name={room.data.name} />;
          }
          return null;
        })
      }

      </div>

    </div>
    </>
  )
}

export default Navbar