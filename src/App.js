import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chats from './components/Chats';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';

function App() {
  // const[user, setUser] = useState(null)
  const[{ user }, dispatch] = useStateValue()



  return (
    <>
    {
      !user ?
      <div className="app">
        <div className='login'>
          <Login  />
        </div>
      </div>
      :
      <div className="app">
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='chatfromapp'>
          <Routes>
            <Route path="/rooms/:roomId" element={<Chats />} />
          </Routes>
        </div>
      </div>
    }
    </>
  );
}

export default App;
