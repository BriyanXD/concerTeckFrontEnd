import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, ValidationUser } from "../../redux/actions";
import style from "./Login.module.css";
import { Link } from "react-router-dom";
// import LoginAuth0  from '../LoginAuth0/LoginAuth0';
// import LogoutAuth0 from '../LogoutAuth0/LogoutAuth0';


export default function Login({toggle}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nuevo = useSelector((state) => state.User);

  // console.log(userValidation, "validation user")
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
 
  

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    validation: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    if (e.target.name === "username") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese un nombre de usuario",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }

    if (e.target.name === "password") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.name]: "Por favor ingrese una contraseña",
        });
      } else if (
        !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/.test(
          e.target.value
        )
      ) {
        setErrors({
          ...errors,
          [e.target.name]:
            "La contraseña ingresada debe tener almenos 1 mayuscula, 1 minuscula, 1 numero, 1 caracter especial y un minimo de 10 caracteres",
        });
      } else {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prueba= await dispatch(ValidationUser(user))
    console.log("🚀 ~ file: Login.jsx ~ line 74 ~ handleSubmit ~ prueba", prueba)
      if (errors.username !== "" || errors.password !== "" ) {
        alert("Para poder registrarse debe solucionar los errores");
        return
      }
  
      if (user.username === "" || user.password === "" || prueba.payload === false) {
       return setErrors({
          username:
            user.username === "" ? "Por favor ingrese un nombre de usuario" : "",
          password:
            user.password === "" ? "Por favor ingrese una contraseña" : "",
          validation:
            prueba.payload === false ? "La cuenta no coincide": ""
        });
      
      }

      
      if (prueba.payload){
        console.log("ingreso acaaaaaaaaaaaaaaa")
            dispatch(LoginUser(user));
            alert("Se registro correctamente");
            setUser({
              username: "",
              password: "",
            });
            toggle()
          }
  };

  return (
      <div>
      <div className={style.contenedorCrearCuenta}>
        <Link to={`/registrar/user`}>
          <button className={style.btn}>Crear cuenta</button>
        </Link>
        {/* <span className={style.spanText}>
          <Link to={`/registrar/producer`} style={{color: "white"}}>Crear cuenta</Link> para productores
        </span> */}
      <button className={style.btn} onClick={() => navigate('/')}>Volver</button>
      </div>
    </div>
    
    // <div className={style.containerLogin}>
    //   <h1 className={style.title}>Iniciar Sesión</h1>
    //   <div className={style.containerPassword}>
    //     <form onSubmit={handleSubmit} className={style.contenedorForm}>
    //       <input
    //         type="text"
    //         name="username"
    //         onBlur={handleBlur}
    //         value={user.username}
    //         onChange={handleChange}
    //         placeholder="Nombre de usuario"
    //       />
    //       {errors.username && <label className={style.errors}>{errors.username}</label>}
    //       <input
    //         type="password"
    //         name="password"
    //         value={user.password}
    //         onBlur={handleBlur}
    //         onChange={handleChange}
    //         placeholder="Contraseña"
    //       />
    //       {errors.password && <label className={style.errors}>{errors.password}</label>}
    //       {errors.validation && <label className={style.errors}>{errors.validation}</label>}
    //       <button className={style.btn}>Iniciar sesión</button>
    //     </form>
    //     <a className={style.etiquetaA} href="#">
    //       ¿Olvidaste tu contraseña?
    //     </a>
    //   </div>

    //   <div className={style.contenedorGoogleFacebook}>
    //     <button className={style.btn}>Iniciar sesion con Google</button>
    //     <button className={style.btn}>Iniciar sesion con Facebook</button>
    //   </div>

    //   <div className={style.contenedorCrearCuenta}>
    //     <Link to={`/registrar/user`}>
    //       <button className={style.btn}>Crear cuenta</button>
    //     </Link>
    //     <span className={style.spanText}>
    //       <Link to={`/registrar/producer`} style={{color: "white"}}>Crear cuenta</Link> para productores
    //     </span>
    //   </div>
    //   <button className={style.btn} onClick={() => navigate('/')}>Volver</button>
    // </div>
  );
}
