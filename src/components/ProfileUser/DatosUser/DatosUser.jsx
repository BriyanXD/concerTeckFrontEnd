import React from 'react';
//import { useSelector } from 'react-redux';
import  style  from './DatosUser.module.css';
import { useAuth0} from "@auth0/auth0-react";


export default function DatosUser () {
    const {user } = useAuth0();
    // const users = useSelector(state => state.User);
    // console.log('user en datosuser',user)
    return (
          <div className={style.containerUser} >
            <img className={style.image} src={user.picture} alt="foto perfil" />
            <h2 className={style.userData}>Nombre: {user.name}</h2>
            <h2 className={style.userData}>Correo: {user.email}</h2>
          </div>);
    };