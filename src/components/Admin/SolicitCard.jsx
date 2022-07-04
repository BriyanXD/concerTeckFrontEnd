import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { findEvent, getEvents } from "../../redux/actions";
import swal from 'sweetalert'

export default function EventCard({id,name}){

    const dispatch = useDispatch()
    /* const userDeleted = useSelector((state) => state.userDeleted) */
    const allEvents = useSelector((state) => state.allEvents)

function filterEvent(){
    dispatch(findEvent(allEvents, id))
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
        <div>
            <p>{id}</p>
            <p>{name}</p>
            <button onClick={handlerDeleteUser}>Borrar</button>
            <button onClick={filterEvent}>Detalles</button>
            <hr />
        </div>
    )
}