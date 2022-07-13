import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PerfilYLogoutAuth0 from '../../LogoutAuth0/PerfilYLogoutAuth0';
import style from './navBarD.module.css';
import NavBarProfile from '../../ProfileUser/NavBarProfile/NavBarProfile';
import logoSombra from "../../../assets/LogoSombra.png";
import Cart from '../../Cart/Cart';
import { useCart } from "react-use-cart";
import Modal2 from "../../Modals/Modal/Modal2";
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import {MdOutlineShoppingCart,MdOutlineWbSunny } from 'react-icons/md';



export default function NavBarDetail(){
  const [active, setActive] = useState(false);
  const { totalUniqueItems } = useCart();
  const {cartDB} = useSelector(state => state);
  let temporal = localStorage.getItem("user")
    const {user, loginWithPopup, logout, isAuthenticated, } = useAuth0();
    let userStorage 
  if(temporal !== "nada"){
    userStorage = JSON.parse(temporal)
  }else{
    userStorage = ""
  }

  const toggle = () => {
    setActive(!active);
  };
    
    function handlerLogin(){
        loginWithPopup()
      }
      localStorage.setItem("userdates",JSON.stringify(user))
    
    return(
        <div className={style.container}>
            <div className={style.Containerlogo}>
              <Link to="/">
                <img className={style.logo} src={logoSombra} alt="Logo not found" />
              </Link>
            </div>
            <div>

        {
          !user ? <button onClick={() => handlerLogin()} className={style.button}>Ingresa</button> : 
        <div className={style.perfil}>
            <PerfilYLogoutAuth0/>
        </div>
        },
         {userStorage.isAdmin === false || userStorage === "" ? <div>  {userStorage !== "" ? <div className={style.Items}>{cartDB.length}</div> : <div className={style.Items}>{totalUniqueItems}</div> }
         <Tooltip title="Ver carrito" arrow>
          <div onClick={toggle} className={style.cart}>
          <MdOutlineShoppingCart className={style.cartlogo}/>
          </div>
          </Tooltip>  </div>:null}
        

          <Modal2 active={active} toggle={toggle}>
            <Cart/>
          </Modal2>
        
           </div>
      </div>
      )
}
