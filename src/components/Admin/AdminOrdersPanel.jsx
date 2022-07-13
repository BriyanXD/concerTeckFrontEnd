import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardOrder from "./CardOrder";
import DetailOrdersAdmin from "./DetailOrdersAdmin";
import Style from "./AdminOrdersPanel.module.css"
import { searchOrder } from "../../redux/actions";

export default function AdminOrdersPanel(){
    const dispatch = useDispatch()
    const allTickets = useSelector(state => state.stateAdminPanel.allTickets)
    const allTiketsByName = useSelector(state => state.stateAdminPanel?.allTiketsByName)
    const modalOrder = useSelector(state => state.stateAdminPanel.modalOrder)
    console.log('ALLTICKET>>', allTickets)
    console.log('ALLTICKETbyname>>', allTiketsByName)

    function handleInputChange(e){
        dispatch(searchOrder(e.target.value))
    }

    return(
        <div className={Style.containerEvents}>
            <div className={Style.SearchBardiv}>
                <input placeholder="Buscar Tickets" className={Style.SearchBar} type="text" onChange= {(e)=> handleInputChange(e)}/>
            </div>
            <div>
                { 
                 allTiketsByName && allTiketsByName.length>0 ? allTiketsByName.map(event => {
                    return( <div>
                        <CardOrder aux={true} id={event.id} userName={event.userName}/>
                    </div> )})
                    : allTickets ? allTickets.map(event => {
                    return( <div>
                        <CardOrder id={event.id} userName={event.userName}/>
                    </div> )
        }): <h1>No se encontraron datos de eventos</h1> }
            </div>
            {modalOrder ? <DetailOrdersAdmin/> : <></>}
        </div>
    )
}