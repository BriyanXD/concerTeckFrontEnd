import React from 'react';
import { useSelector } from 'react-redux';
import  style  from './DatosUser.module.css';

export default function DatosUser () {
    const user = useSelector(state => state.User);
    return (
          <div className={style.containerUser}>
            <h2 className={style.userData}>Correo: {user[0].email}</h2>
          </div>);
    };