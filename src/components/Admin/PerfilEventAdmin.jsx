import React from "react"
import {useSelector, useDispatch} from "react-redux"
import Style from "./PerfilEventAdmin.module.css"
import { activeModalEventsAdminPanel } from "../../redux/actions"

export default function PerfilEventAdmin(){
    const eventSaved = useSelector((state) => state.eventSaved)
    const dispatch = useDispatch()
    function andlerCloseButton(){
        dispatch(activeModalEventsAdminPanel(false))
    }

    return(
        <div className={Style.containerGeneral}>
            <div className={Style.containerInfo}>
                <div className={Style.containerClose}>
                    <button onClick={andlerCloseButton} className={Style.btnClose}>X</button>
                </div>
                <div className={Style.info}>
                    <p>ID: {eventSaved.id}</p>
                    <p>Nombre: {eventSaved.name}</p>
                    <p>artist: {eventSaved.artist}</p>
                    <p>schedule: {eventSaved.schedule}</p>
                    <p>description: {eventSaved.description}</p>
                </div>
            </div>
        </div>
    )
}