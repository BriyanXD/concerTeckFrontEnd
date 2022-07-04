import React from "react";
import Login from "../Login/Login";
import Modal from "../Modals/Modal/Modal";
import { useState } from "react";
import NavBarProfile from '../ProfileUser/NavBarProfile/NavBarProfile'
import { useDispatch, useSelector } from "react-redux";
// import CardConteiner from "./adminCardConteiner";
import {getAllUsers, getEvents, getAllSolicits} from "../../redux/actions"
import Style from "./adminPanel.module.css"

import AdminUserPanel from "./AdminUserPanel";
import AdminEventPanel from "./AdminEventPanel";
//import AdminSolicitPanel from "./AdminSolicitPanel";
import AdminSolicit from "./AdminSolicit";

export default function PanelAdmin({setUser}){
    
    const allEvents = useSelector((state) => state.AllEvents)
    const [active, setActive] = useState(false);
    const [usersActive, setUsers] = useState(true);
    const [eventsActive, setEvents] = useState(false);
    const [solicitsActive, setSolicits] = useState(false);


    const user = useSelector((state) => state.User);


    
    const dispatch = useDispatch()
    
    /* useEffect (()=>{
        dispatch(getAllUsers())
    },[dispatch])

    const userInfo = useSelector((state) => state.stateAdminPanel?.allUsers)
    console.log(userInfo)
    // const token = useSelector((state) => state.token);
    // useLocalStorage()*/

    const toggle = () => {
        setActive(!active);
    };

    // function handleClickUser() {
    //     return(
    //         <div>
    //         {
    //             userInfo?.map((e,k) =>{
    //                 return(
    //                     <div>
    //                         <UserCard key={k} id={e.id} username={e.username}/>
    //                     </div>
    //                 )
    //             })
    //         }
    //     </div>
    //     )
    // }
    function handlerClickUsuarios(){
        dispatch(getAllUsers())
        setEvents(false)
        setSolicits(false)
        setUsers(true)
    }
    function handlerClickEventos(){
        dispatch(getEvents())
        setSolicits(false)
        setUsers(false)
        setEvents(true)
    }
    function handlerClickSolicits(){
        dispatch(getAllSolicits())
        setEvents(false)
        setUsers(false)
        setSolicits(true)
    }
    
    return(
        <div>
            <div className={Style.containerNavbar}>
                <NavBarProfile/>
            </div>
            <div className={Style.containerGeneral}>
            <div className={Style.sideBar}>
                <div className={Style.userContainer}>
                <Modal active={active} toggle={toggle}>
                    <Login toggle={toggle} />
                </Modal>
                {/* <UserNavBar/> */}
                </div>
                <div className={Style.buttonsContainer}>
                    <button className={Style.button} onClick={handlerClickUsuarios}>Usuario</button>
                    <br />
                    <button className={Style.button} onClick={handlerClickEventos}>Eventos</button>
                    <br />
{/*                     <button onClick={handlerClickSolicits}>Solicitudes</button> */}
                </div>
        </div>
            <div className={Style.containersInfo}>
            {usersActive ? <AdminUserPanel/> : eventsActive ? <AdminEventPanel/>: solicitsActive ? <AdminSolicit/>: <h1>Error</h1> }
            </div>
        </div>
        </div>
    )
}


{/*             {
                userInfo?.map((e,k) =>{
                    return(
                        <div>
                            <UserCard key={k} id={e.id} username={e.username}/>
                        </div>
                    )
                })
            } */}


