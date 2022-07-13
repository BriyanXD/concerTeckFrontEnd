import React from 'react';
import style from './NavBarProfile.module.css';
import { Link } from 'react-router-dom';
import logoSombra from '../../../assets/Logo-png.png';
import PerfilYLogoutAuth0 from '../../LogoutAuth0/PerfilYLogoutAuth0';
import { BsFillStarFill } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

export default function NavBarProfile () {

    const user = JSON.parse(localStorage.getItem("user"))
    const userdates = JSON.parse(localStorage.getItem("userdates"))
    console.log(user,"EXTRAIDOS")

    return(<div className={style.containerNavBarProfile}>
         <Link to="/">
          <img className={style.logo} src={logoSombra} alt="Logo not found" />
        </Link>
        {user.isAdmin === false ? <Link to='/favs' style={{ textDecoration: "none" }}>
            <span className={style.titleData2}> Favoritos </span>
        </Link> : <span className={style.adminnav}><FontAwesomeIcon icon={faCrown}/>Admin</span>}
            {/* <span className={style.titleData}>Nombre: {userdates.name}</span> */}
            <div className={style.fix}>

         <PerfilYLogoutAuth0/>
            </div>
    </div>)
}