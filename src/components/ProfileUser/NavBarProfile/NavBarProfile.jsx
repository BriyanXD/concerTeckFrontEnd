import React from 'react';
import style from './NavBarProfile.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logoSombra from '../../../assets/Logo-png.png';
import PerfilYLogoutAuth0 from '../../LogoutAuth0/PerfilYLogoutAuth0';

export default function NavBarProfile () {

    const user = useSelector(state => state.User);

    return(<div className={style.containerNavBarProfile}>
         <Link to="/">
          <img className={style.logo} src={logoSombra} alt="Logo not found" />
        </Link>
            <span className={style.titleData}>Nombre: {user[0].name}</span>
         <PerfilYLogoutAuth0/>
    </div>)
}