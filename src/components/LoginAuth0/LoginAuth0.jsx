import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import style from './LoginAuth0.module.css'
import PerfilYLogoutAuth0 from '../LogoutAuth0/PerfilYLogoutAuth0';



export default function LoginAuth0(){
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    loginWithPopup
  } = useAuth0();


  return(
  <div>
    {
    !user ? <button onClick={() => loginWithPopup()} className={style.button}>Log In</button> : <PerfilYLogoutAuth0/>
    }
  </div>
  )
};

