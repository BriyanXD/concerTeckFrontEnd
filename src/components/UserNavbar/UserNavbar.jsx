import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./UserNavbar.module.css";
import profile from "../../assets/profile-user.png";
import { LogOut } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function UserNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);

  const [menuOpen, setMenuOpen] = useState(false);

  //Function toma la accion de click si el id es distinto a menu
  document.addEventListener("click", function (event) {
    if (event.target.id !== "menu") {
      setMenuOpen(false);
    }
  });

  return (
    <div className={style.navProfilePhoto}>
      <img
        id="menu"
        className={style.image}
        src={profile}
        alt="image not found"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div className={style.userList}>
          {user[1] !== undefined ? (
            <h3 className={style.list}>{user[1].username}</h3>
          ) : null}
          <Link
            to={`/perfil/${user[0]}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
           {user?<h3 className={style.list}>Perfil</h3>:<h3 className={style.list}>Usuario no registrado</h3>}
          </Link>
          {user !== "" ? (
            <h3
              className={style.list}
              onClick={() => dispatch(LogOut()) && navigate("/")}
            >
              Cerrar sesión
            </h3>
          ) : null}
        </div>
      )}
    </div>
  );
}
