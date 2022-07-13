import React from "react"
import { useEffect } from "react"
import {useSelector, useDispatch} from "react-redux"
import {activeModalOrdersAdminPanel ,EventById,findUser} from "../../redux/actions"
import Style from "./DetailOrdersAdmin.module.css"

export default function DetailOrdersAdmin(){
    const saveFindTicket = useSelector((state) => state.stateAdminPanel.saveFindTicket)
    const allUsers = useSelector((state) => state.stateAdminPanel.allUsers)
    const userSaved = useSelector((state) => state.userSaved)
    const eventSaved = useSelector((state) => state.Detail)


    const dispatch = useDispatch()
function handlerCloseClick(){
    dispatch(activeModalOrdersAdminPanel(false))
}

useEffect(() => {
    dispatch(EventById(saveFindTicket.eventId))
    dispatch(findUser(allUsers,saveFindTicket.userId))
},[dispatch])
console.log()
    return(
        <div className={Style.containerGeneral}>
        <div className={Style.containerInfo}>
        <div className={Style.containerClose}>
        <button className={Style.btnClose} onClick={handlerCloseClick}>X</button>
    </div>
<div className={Style.info}>
                <div className={Style.containerTicket}>
                <p className={Style.title}>Datos del ticket</p>
                <p>ID: {saveFindTicket.id}</p>
                <p>Nombre: {saveFindTicket.name}</p>
                <p>Price: {saveFindTicket.price}</p>
                <p>User ID: {saveFindTicket.userId}</p>
                <p>Event ID: {saveFindTicket.eventId}</p>
                </div>
            </div>
                <div className={Style.contenedorEventUser}>
                    <div className={Style.contenedorUser}>
                    <p className={Style.title}>Datos del usuario</p>
                    <p>ID: {userSaved.id}</p>
                    <p>Nombre: {userSaved.name}</p>
                    <p>Email: {userSaved.email}</p>
                    </div>
                    <div className={Style.contenedorEvent}>
                    <p className={Style.title}>Datos del evento</p>
                    <p>ID: {eventSaved.id}</p>
                    <p>Nombre: {eventSaved.name}</p>
                    <p>Artista: {eventSaved.artist}</p>
                    <p>Schedule: {eventSaved.schedule}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}