import React from "react"
import { useSelector, useDispatch } from "react-redux";
import {findTicket, getEvents, activeModalOrdersAdminPanel } from "../../redux/actions";
import swal from 'sweetalert'
import Style from "./UserCard.module.css"

export default function CardOrder({id,userName}){

    const dispatch = useDispatch()
    const allTickets = useSelector((state) => state.stateAdminPanel.allTickets)

function filterTicket(){
    dispatch(activeModalOrdersAdminPanel(true))
    dispatch(findTicket(allTickets, id))
}

function handlerDeleteUser(){
         /* dispatch(deleteEvent(id)) */
        if(true){
            return swal({
                title: 'Usuario no eliminado',
                text: 'El usuario no se elimino',
                icon: 'error',
                dangerMode:true
            })
        }else{
            return swal({
                title: 'Usuario eliminado',
                text: 'El usuario se elimino con exito',
                icon: 'success',
            }),dispatch(getEvents())
        }
    }

    return(
        <div className={Style.cardEvent}>
            <p className={Style.id}>{id}</p>
            <p className={Style.name}>{userName}</p>
            <div className={Style.buttonsCard}>
            <button className={Style.button} onClick={filterTicket}>Detalles</button>
            </div>
        </div>
    )
}