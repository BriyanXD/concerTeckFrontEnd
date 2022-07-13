import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicketById, GetVenues } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import style from './TicketVoucher.module.css'



export default function TicketVoucher(){
    const { id } = useParams();
    const { ticket } = useSelector((state) => state);
    const  Venues  = useSelector((state) => state.Venues);
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        dispatch(getTicketById(id))
    },[dispatch, id])

    useEffect(() =>{
        dispatch(GetVenues())
    },[dispatch])

    let lugar = ''
    if(Venues){
        lugar = Venues?.find(e => e.id === ticket?.event?.venueId)
        console.log(lugar,'ACA ESTOY')
    }
    
    let date ='';
    let time = '';
    let artista = '';
    
    if(ticket){
        date = ticket.event?.schedule !== undefined? ticket.event.schedule.split('T')[0] : null
        // prueba = date? date?.split('-')[2] : null
        // console.log(prueba,'ESTE ES EL CONSOLE.LOG')
        time = ticket.event?.schedule !== undefined ? ticket.event.schedule.split('T')[1].split(':')[0]+':'+  ticket.event?.schedule.split('T')[1].split(':')[1] :null
        artista = ticket.event?.artist !== undefined ? ticket.event.artist.split([' '], [ 2] ).join(' ') : null;
    }
    // let lugar= ''
    // if(Venues){
    //     lugar = 
    // }




    return(
        <div className={style.container}>
            <NavBar/>
            {/* <NavBarProfile/> */}
            <h1 className={style.entrada}>Tu Entrada</h1>
            <div class={style.ticket}>
            {/* <img className={style.ticket} src={ticket.event?.performerImage} alt="" /> */}
                <div class={style.date}>
                    <span class={style.artist}>{artista}</span>
                    {/* <span class={style.month}>{time}</span> */}
                </div>

                <div class={style.day}>
                    <span class={style.name}>{date}</span>
                    <br />
                    <span class={style.small}>{time}</span>
                </div>

                <div class={style.location}>
                    <span class={style.type}>{ticket.name}</span>
                </div>
                <div className={style.places}>
                    <span class={style.locationName}>{lugar?.name}</span>
                    <br />
                    <span class= {style.locationAddress}>{lugar?.address}</span>
                </div>

                <div class={style.rip}></div>
  
                <div class={style.cta}>
                    <button class={style.buy} href="#">{ticket.id}</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}






// <div className={style.contenido}>
//                 <div className={style.datos}>
//                     <h3>Nombre del Evento: {ticket?.event?.name}</h3>
//                     <h4>Nombre Artista: {ticket?.event?.artist}</h4>
//                     <h4>Fecha: {date}</h4>
//                     <h4>Hora: {time} hs</h4>
//                     <h4>Tu tipo de Entrada: {ticket.name}</h4>
//                     <h4>Valor: $ {ticket.price}</h4>
//                 </div>
//                 <div>
//                     {/* <img className={style.img} src={ticket.event?.performerImage} alt="" /> */}
//                 </div>
//             </div>
//                     <h4 className={style.id}>Número de entrada : {ticket.id}</h4>
//             <div>
//             <Footer />
//             </div>