import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDB, ActualizacionStock, postTicket } from '../../redux/actions';
import { Link } from 'react-router-dom';
import style from './SuccessOrCancel.module.css'; 
import online3 from '../../img/online3.png';
import closed from '../../img/closed.png';

export default function SuccessOrCancel () {
    const [message, setMessage] = useState("")
    const { cartDB } = useSelector(state => state);
    const [flag, setFlag] = useState(false)
    const dispatch = useDispatch();
    const user = localStorage.getItem("user");
    const tempUser = JSON.parse(user)

    useEffect(() => {
        if(tempUser){
            dispatch(getCartDB(tempUser.id))
        }
    },[])

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          setMessage("Tu compra se completó con éxito. Gracias por confiar en nosotros! ");
          const prueba = async() => {
            for(const cart of cartDB)
            await dispatch(postTicket(cart))
          }
          prueba();
          setFlag(!flag)
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Compra cancelada. Por favor revisá tu pedido y volvé a intentar!");
        }
      }, [cartDB]);

      useEffect(() => {
        dispatch(ActualizacionStock(cartDB))
      },[flag])


    return(
      <div className={style.contenedor}>
            {message? (
              <div className={style.container}>
            <h1 className={style.h1}>{message}</h1>
            <img className={style.img} src={online3} alt="" />
            <Link to='/'><button className={style.button}>Volver a inicio</button></Link>
              </div>
            ) : 
            ( <div className={style.container}>
              <h1 className={style.h1}>{message}</h1>
              <img className={style.img} src={closed} alt="" />
              <Link to='/'><button className={style.button}>Volver a inicio</button></Link>
                </div>
                )}
    </div>
    )
}