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
  const[{user}, dispatch] = useStateValue()
  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return ()=>{
      unsubscribe()
    }

  },[])

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
        {
          rooms.map(room=>{
            return <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          })
        }

      </div>

    </div>
    </>
  )
}

export default Navbar