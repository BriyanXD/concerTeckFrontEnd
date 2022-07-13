import React from "react";
import style from "./Profile.module.css";
import NavBarProfile from "./NavBarProfile/NavBarProfile";
import Cart from '../Cart/Cart';
import { Link } from "react-router-dom";
import DatosUser from "./DatosUser/DatosUser";




export default function ProfileUser() {
  return (
    <div className={style.containerProfileUser}>
      <div className={style.profile}>
      <NavBarProfile />
      </div>
      <div className={style.cards}>
        <div className={style.containerDataUser}>
          <DatosUser/>
        </div>
        <div className={style.containerDataUser}>
        <Cart/>
        </div>
      </div>
      <div className={style.containerBtn}>
        <Link to='/'>
            <button className={style.buttonBack}>Volver</button>
        </Link>
      </div>
    </div>
  );
}
