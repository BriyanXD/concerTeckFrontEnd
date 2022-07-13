import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {activeModalUsersAdminPanel} from "../../redux/actions"
import Style from "./PerfilUserAdmin.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
export default function PerfilUserAdmin(){
    const userSaved = useSelector((state) => state.userSaved)
    const dispatch = useDispatch()
function handlerCloseClic(){
    dispatch(activeModalUsersAdminPanel(false))
}
    return(
        <div className={Style.containerGeneral}>
<div className={Style.containerInfo}>
    <div className={Style.containerClose}>
        <button className={Style.btnClose} onClick={handlerCloseClic}>x</button>
    </div>
<div className={Style.info}>
                {userSaved.isAdmin ? <p className={Style.admin}><FontAwesomeIcon icon={faCrown}/>Administrador</p> : null }
                <p className={Style.title}>ID:</p>{userSaved.id}
                <p className={Style.title}>Nombre: </p>{userSaved.name}
                <p className={Style.title}>Username: </p>{userSaved.username}
                <p className={Style.title}>Email: </p>{userSaved.email}
            </div>
            {userSaved.tickets.length >= 1 ? userSaved.tickets.map(ticket => {
                return( <div className={Style.tickets}>
                    <p className={Style.title}>ID:</p>{ticket.id}
                    <p className={Style.title}>Type:</p>{ticket.name}
                    <p className={Style.title}>Event:</p>{ticket.eventName}
                </div> )
            }):<></> }
</div>
        </div>
    )
}