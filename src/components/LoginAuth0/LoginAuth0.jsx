import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import style from './LoginAuth0.module.css'
import PerfilYLogoutAuth0 from '../LogoutAuth0/PerfilYLogoutAuth0';
import { useDispatch } from 'react-redux';



export default function LoginAuth0(){
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    loginWithPopup
  } = useAuth0();
console.log('user en loguin', user)
  function handlerLogin(){

    loginWithPopup()
  }
  localStorage.setItem("userdates",JSON.stringify(user))

  return(
  <div>
    {
    !user ? <button onClick={() => handlerLogin()} className={style.button}>Ingresar</button> : <PerfilYLogoutAuth0/>
    },
  </div>
  )
};

