import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import style from './CartCheckout.module.css'
import Cart from '../Cart/Cart'

export default function CartCheckout () {
    const url = useSelector(state => state.sesion.url);
    const cartDetail = useSelector(state => state.cartDB)
    console.log("CART DB", cartDetail)

    const totalTodos = cartDetail.map(item => item.itemTotal).reduce((prev, curr) => prev + curr, 0);

    return(
            <div className={style.container}>
                <h1 className={style.detalle}>Detalles de la compra</h1>
                <div className={style.card}>
                    {
                    cartDetail.map((cartD)=>{
                        let fechActual = new Date(cartD.schedule);
                        fechActual = fechActual.toString().split(" ").slice(1,5).join("-");
                    return(
                        <div className={style.contenedor}>
                            <img src={cartD.performerImage ? cartD.performerImage : null} className={style.img}/>
                            <div className={style.cardDetail}>
                                <div className={style.separacion}>
                            <div className={style.name}>{cartD.nombre}</div>
                            {/* <div className={style.schedule}> {cartD.schedule.split("T")[0]} {'  '}
                            {cartD.schedule.split("T")[1].split(":")[0] + ":" + cartD.schedule.split("T")[1].split(":")[1]} h</div> */}
                            <div className={style.schedule}>{fechActual}h.</div>
                            <div className={style.type}><label>Tipo de entrada: {cartD.name[0].toUpperCase() + cartD.name.substring(1)} </label></div>
                            </div>
                            {/* <br /> */}
                            <div className={style.separacion}>
                            <div className={style.price}><label>Precio: ${cartD.price}</label> </div>
                            <div className={style.quantity}> <label>Cantidad: {cartD.quantity}</label></div>
                            {/* <br /> */}
                            <div className={style.total}><label>Precio total: ${cartD.itemTotal}</label> </div>
                            </div>
                            </div>
                        </div>
                        )
                    })
                }
                <div className={style.totalFinal}>Total final: ${totalTodos} ARS.</div>
                </div>

                <div className={style.btn}>
                <div><Link to='/'><button className={style.button}>Volver a inicio</button></Link></div>
                <a href={`${url}`}>
                <button className={style.button}>Comprar</button>
                </a> 
                </div>
            </div>
        )
}
