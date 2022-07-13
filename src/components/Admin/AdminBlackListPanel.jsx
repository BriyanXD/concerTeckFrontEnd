import React from "react";
import { useDispatch, useSelector } from "react-redux";
import BlackListCard from "./BlackListCard";
import PerfilEventAdmin from "./PerfilEventAdmin";
import Style from "./AdminEventPanel.module.css";
import { searchBlackList } from '../../redux/actions';

export default function AdminBlackListPanel(){
    const allBlackList = useSelector((state) => state.stateAdminPanel?.allBlackList)
    const blackListByName = useSelector((state) => state.stateAdminPanel?.blackListByName)
    const modalEvent = useSelector((state) => state.stateAdminPanel.modalEvent)
    const tdosEvents = useSelector((state) => state.stateAdminPanel.tdosEvents)
    const dispatch = useDispatch()
    // console.log('LISTA >>',allBlackList)
    // console.log('NEGROS >>',blackListByName)

    function handleInputChange(e){
        dispatch(searchBlackList(e.target.value))
    }

    return(
        <div className={Style.containerEvents}>
            <div className={Style.SearchBardiv}>
                <input id='search' placeholder='Buscar Usuarios Baneados' className={Style.SearchBar} type='text' onChange= {(e)=> handleInputChange(e)}/>
            </div>
            <div>
                { 
                 blackListByName && blackListByName.length>0 ? blackListByName.map(user => {
                    return( <div>
                        <BlackListCard aux={true} id={user.id} name={user.name} email={user.email}/>
                    </div> )})
                 :
                 allBlackList ? allBlackList.map(user => {
                    return( <div>
                        <BlackListCard id={user.id} name={user.name} email={user.email}/>
                    </div> )}) 
                 : <h1>No se encontraron datos</h1> }</div>
            { modalEvent ? <PerfilEventAdmin/> : <></>}
        </div>
    )
}