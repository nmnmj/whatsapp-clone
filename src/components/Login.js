import React from 'react'
import GoogleButton from 'react-google-button';
import { auth, provider } from '../config/firebaseconfig';
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


const Login = () => {
    const[{}, dispatch] = useStateValue()
    const handlesignin = (e)=> {
        e.preventDefault();
        signInWithPopup(auth, provider)
          .then((data) => {
            // setUser(data.user.email);
            dispatch({
                type:actionTypes.SET_USER,
                user:data.user
            })
            // console.log(data.user);
            // console.log(data.user.email);
            // console.log(data.user.displayName);
            // console.log(data.user.photoURL);
            // console.log(data.user.uid);
          })
          .catch((error) => {
            alert(error);
          });
    };
  return (
    <div>
        <div className="logincontainer">
        <h1>Sign in to WhatsApp</h1>
        <button onClick={handlesignin} style={{ border: "none", backgroundColor: "transparent" }}>
            <GoogleButton />
        </button>
        </div>
    </div>
  )
}

export default Login