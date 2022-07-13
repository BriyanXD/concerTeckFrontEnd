import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCard from "./EventCard";
import PerfilEventAdmin from "./PerfilEventAdmin";
import Style from "./AdminEventPanel.module.css"
import { findEventByName } from "../../redux/actions";

export default function AdminEventPanel(){
    const allEvents = useSelector((state) => state.AllEvents)
    const modalEvent = useSelector((state) => state.stateAdminPanel.modalEvent)
    const tdosEvents = useSelector((state) => state.stateAdminPanel.tdosEvents)
    const dispatch = useDispatch()
    console.log('Prueba',tdosEvents)
    function handleInputChange(e){
        dispatch(findEventByName(e.target.value))
    }

    return(
        <div className={Style.containerEvents}>
            <div className={Style.SearchBardiv}>
                <input onChange={(e) => handleInputChange(e)} placeholder="Buscar Eventos" className={Style.SearchBar} type="text" />
            </div>
            <div>
                {
                tdosEvents && tdosEvents.length>0 ?
                tdosEvents.map(user => {
                    return(
                        <div key={user.id}>
                        <EventCard aux={true} id={user.id} name={user.name}/>
                    </div> )})
                :
                allEvents ? allEvents.map(event => {
                    return( <div>
                        <EventCard id={event.id} name={event.name}/>
                    </div> )
        }): <h1>No se encontraron datos de eventos</h1> }
            </div>
            {modalEvent ? <PerfilEventAdmin/> : <></>}
        </div>
    )
}