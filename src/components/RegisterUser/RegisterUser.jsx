import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./RegisterUser.module.css";
import swal from 'sweetalert'
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
 




export default function RegisterUser() {
  const[input,setInput] = useState({name:'',lastname:'',email:'',company:'', telephone: '',
cuit_cuil: '',message: ''})
const[error,setError] = useState({})

const navigate = useNavigate()

  
  //Function que modifica el estado local con los valores de los input
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  //Function que hace las validaciones
  function handleBlur(e){
    
if(e.target.name === 'name'){
  if(e.target.value === ""){
    setError({
        ...error,
        [e.target.name]: "Por favor ingrese un nombre"
    })
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
    setError({
        ...error,
        [e.target.name]: "Por favor ingrese un nombre válido"
    })
  }else {
    setError({
        ...error,
        [e.target.name]: ""
    })
}
}

if(e.target.name === "lastname"){
  if(e.target.value === ""){
      setError({
          ...error,
          [e.target.name]: "Por favor ingrese un apellido"
      })
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
      setError({
          ...error,
          [e.target.name]: "Por favor ingrese un apellido válido"
      })
  } else {
      setError({
          ...error,
          [e.target.name]: ""
      })
  }
}
  
if(e.target.name === "company"){
  if(e.target.value === ""){
      setError({
          ...error,
          [e.target.name]: "Por favor ingrese una empresa"
      })
  } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
      setError({
          ...error,
          [e.target.name]: "Por favor ingrese una empresa válida"
      })
  } else {
      setError({
          ...error,
          [e.target.name]: ""
      })
  }
}

if(e.target.name === "message"){
  if(e.target.value === ""){
    setError({
      ...error,
      [e.target.name]: 'Por favor ingrese su consulta'
    })
  } else if (/[$%&|<>#]/.test(input.message)){
    setError({
      ...error,
      [e.target.name]: 'Mensaje inválido'
    }) 
  } else {
    setError({
        ...error,
        [e.target.name]: ""
    })
  }
}

if(e.target.name === "cuit_cuil"){
  if(e.target.value === ""){
      setError({
          ...error,
          [e.target.name]: "Por favor ingrese un CUIT o CUIL"
      })
  } else if(!/^([0-9])*$/.test(e.target.value)){
      setError({
          ...error,
          [e.target.name]: "Por favor los caracteres ingresados deben ser números"
      })
  } else {
      setError({
          ...error,
          [e.target.name]: ""
      })
  }
}

if(e.target.name === "email"){
  if(e.target.value === ""){
      setError({
          ...error,
          [e.target.name]: "Por favor un email"
      })
  } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(e.target.value)){
      setError({
          ...error,
          [e.target.name]: "Ingrese un email válido"
      })
  } else {
      setError({
          ...error,
          [e.target.name]: ""
      })
  }
}

if(e.target.name === "telephone"){
  if(e.target.value === ""){
      setError({
          ...error,
          [e.target.name]: "Por favor ingrese un número de teléfono"
      })
  } else if (isNaN(Number(e.target.value))){
      setError({
          ...error,
          [e.target.name]: "Solo se puede ingresar números"
      })
  } else {
      setError({
          ...error,
          [e.target.name]: ""
      })
  }
}


  }

  function handleSubmit(e){
    if( !input.name ||
      !input.lastname ||
      !input.email ||
      !input.cuit_cuil ||
      !input.company ||
      !input.message ||
      !input.telephone)
      {
          e.preventDefault();
           return swal({
            title: 'Mensaje no enviado',
            text: 'Por favor ingrese los datos ',
            icon: 'error',
            dangerMode:true})
                 }
      if (
        error.name ||
        error.lastname ||
        error.cuit_cuil ||
        error.email ||
        error.telephone ||
        error.company ||
        error.message 
      ) {
        e.preventDefault()
      return swal({
        title: 'Mensaje no enviado',
        text: 'Por favor ingrese los datos solicitados',
        icon: 'error',
        dangerMode:true})
      }
      return swal({
        title: 'Mensaje enviado correctamente',
        icon: 'success',
        button: 'Aceptar',
        timer: 5000
       })
      }
      // navigate("/");


  return (
    <div className={style.containerRegisterUser}>
      <NavBar />
      <div className={style.conteinerData}>
      <h2 className={style.title}>Contanos tu Propuesta</h2>
          <form  action='https://formsubmit.co/concerteck@gmail.com'  method='POST' className={style.form}>
         <div className={style.containerInput}></div> 
          <input
            name="name"
            value={input.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error.name?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={error.name?.length > 0 ? error.name : "Nombre"}
          />
          <div className={style.containerInput}></div>
          <input
            name="lastname"
            value={input.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error.lastname?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={error.lastname?.length > 0 ? error.lastname : "Apellido"}
          />
         
          <div className={style.containerInput}></div>
          <input
            name="cuit_cuil"
            value={input.cuit_cuil}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error.cuit_cuil?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={error.cuit_cuil?.length > 0 ? error.cuit_cuil : "Número de CUIT / CUIL"}
          />
          <div className={style.containerInput}></div>
          <input
            name="email"
            value={input.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error.email?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={error.email?.length > 0 ? error.email : "Correo electrónico"}
          />
       
          <div className={style.containerInput}></div>
          <input
            name="telephone"
            value={input.telephone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error.telephone?.length > 0 ? style.error :style.inputText}
            type="number"
            placeholder={error.telephone?.length > 0 ? error.telephone : "Teléfono"}
          />
         <div className={style.containerInput}></div>
          <input
            name="company"
            value={input.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={error.company?.length > 0 ? style.error :style.inputText}
            type="text"
            placeholder={error.company?.length > 0 ? error.company : "Compañía"}
          />
        <div>
          <textarea 
            onChange={handleChange}
            onBlur={handleBlur} 
            name='message' 
            className={error.message?.length > 0 ? style.errorMessage : style.reasonContact} value={input.message} 
            type='message'  rows='5' cols='50' 
            placeholder={error.message?.length > 0 ? error.message : 'Motivo de consulta'}>
            </textarea>
        </div>
        <div className={style.containerBtn}>
          <button type="submit" onClick={handleSubmit} className={style.btn}>Enviar consulta</button>
          <button onClick={() => navigate("/")} className={style.btn}>Volver</button>
        </div>
        </form >
      </div>
      <Footer />
    </div>
  );
}
