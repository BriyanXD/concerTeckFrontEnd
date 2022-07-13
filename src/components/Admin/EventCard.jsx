import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { findEvent, getEvents, deleteEvents, activeModalEventsAdminPanel, searchEventIDEmails } from "../../redux/actions";
import swal from 'sweetalert'
import Style from "./EventCard.module.css"

export default function EventCard({id,name}){

    const dispatch = useDispatch()
    const allevents = useSelector((state) => state?.AllEvents)
    const eventDeleted = useSelector((state) => state.eventDeleted)
    

function filterEvent(){
    dispatch(findEvent(allevents, id))
    dispatch(activeModalEventsAdminPanel(true))
    dispatch(searchEventIDEmails(id))
}

async function handlerDeleteEvent(){
        await dispatch(deleteEvents(id))
        if(eventDeleted?.message){
            return swal({
                title: 'Evento no eliminado',
                text: 'El evento no se pudo eliminar',
                icon: 'error',
                dangerMode:true
            })
        }else{
            await dispatch(getEvents())
            return swal({
                title: 'Evento eliminado',
                text: 'El evento se eliminó',
                icon: 'success',
            })
        }
    }

    return(
        <div className={Style.cardEvent}>
            <p className={Style.id}>{id}</p>
            <p className={Style.name}>{name}</p>
            <div className={Style.buttonsCard}>
            <button className={Style.button} onClick={handlerDeleteEvent}>Borrar</button>
            <button className={Style.button} onClick={filterEvent}>Detalles</button>
            </div>
        </div>
    )
}