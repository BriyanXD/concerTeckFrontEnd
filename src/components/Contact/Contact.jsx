import React, { useState } from 'react';
import style from './Contact.module.css';
import swal from 'sweetalert'


export default function Contact() {
  const[input,setInput] = useState({name:'',email:'',telephone:'',message:''})
  const[error,setError] = useState({})
  // const[button,setButton] = false
  

  function handleInputChange(e){

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    
  }
  
  function handlerInputBlur(e){
    
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
            [e.target.name]: "Por favor ingrese número de teléfono"
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

  function handleAlert(e){
    
    if(!input.name || !input.message || !input.email || !input.telephone){
      e.preventDefault()
      return swal({
        title: 'Mensaje no enviado',
        text: 'Por favor ingrese los datos solicitados',
        icon: 'error',
        dangerMode:true})
      }

      if(error.name || error.message || error.email || error.telephone){
        e.preventDefault()
        if(error.name){
          return swal({
            title: 'Por favor complete el Nombre',
            icon: 'warning'})
        }
        
        if(error.message){
          return swal({
            title: 'Por favor complete su consulta',
            icon: 'warning'}
            )
        }
        if(error.telephone){
          return swal({
            title: 'Por favor ingrese un número de teléfono válido',
            icon: 'warning'})
        }
        if(error.email){
          return swal({
            title: 'Por favor ingrese un mail válido',
            icon: 'warning'})
        }
        return swal({
          title: 'Correo de consulta no enviado',
          text: 'Por favor chequee los datos ingresados',
          icon: 'error'})
      }
    return swal({
      title: 'Mensaje enviado correctamente',
      icon: 'success',
      button: 'Aceptar',
     })
  }

  return (
    <div className={style.containerContact}>
      <form action='https://formsubmit.co/concerteck@gmail.com' method='POST' className={style.form}>
        <div>
          <input 
          onChange={handleInputChange} 
          onBlur={handlerInputBlur} 
          value={input.name} 
          name='name' 
          className={error.name?.length > 0 ? style.errors : style.nameContact} type='text' 
          placeholder={error.name?.length > 0 ? error.name : 'Nombre o razón social...'}/>
        </div>
      <br/>
      <div>
        <input onChange={handleInputChange} onBlur={handlerInputBlur} value={input.email} name='email' className={error.email?.length > 0 ? style.errors : style.mailContact} type='email' 
        placeholder={error.email?.length > 0 ? error.email : 'Email'}/>
      </div>
      <br/>
      <div>
      <input onChange={handleInputChange} onBlur={handlerInputBlur} value={input.telephone} name='telephone' className={error.telephone?.length > 0 ? style.errors : style.phoneContact} type='text' 
      placeholder={error.telephone?.length > 0 ? error.telephone : 'Teléfono'}/>
      </div>
      <br/>
      <div>
        <textarea onChange={handleInputChange} onBlur={handlerInputBlur} name='message' className={error.message?.length > 0 ? style.errorMessage : style.reasonContact} value={input.message} type='message'  rows='5' cols='50' 
        placeholder={error.message?.length > 0 ? error.message : 'Motivo de consulta'}></textarea>
      </div>
      <div className={style.containerbtnsend}>
      <button type='submit'  onClick={(e)=> handleAlert(e)} className={style.btnSend}>Enviar</button>
      </div>
      </form>
    </div>
  )
}









  
