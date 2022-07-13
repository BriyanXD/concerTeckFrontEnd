import React from "react";
import Login from "../Login/Login";
import Modal from "../Modals/Modal/Modal";
import { useState, useEffect } from "react";
import NavBarProfile from '../ProfileUser/NavBarProfile/NavBarProfile'
import { useDispatch, useSelector } from "react-redux";
// import CardConteiner from "./adminCardConteiner";
import {getAllUsers, getEvents, getAllBlackList,getAllTickets} from "../../redux/actions"
import Style from "./adminPanel.module.css"
import { Link, useNavigate } from "react-router-dom";
import AdminUserPanel from "./AdminUserPanel";
import AdminEventPanel from "./AdminEventPanel";
//import AdminSolicitPanel from "./AdminSolicitPanel";
import AdminBlackListPanel from "./AdminBlackListPanel";
import AdminOrdersPanel from "./AdminOrdersPanel";

export default function PanelAdmin({setUser}){
    
    const allEvents = useSelector((state) => state.AllEvents)
    const [active, setActive] = useState(false);
    const [usersActive, setUsers] = useState(true);
    const [eventsActive, setEvents] = useState(false);
    const [blackList, setBlackList] = useState(false);
    const [ordersActive, setOrdersActive] = useState(false);

    const user = useSelector((state) => state.User);
    const navigate = useNavigate(); 
    const dispatch = useDispatch()

    useEffect(()=>{
        try{
            const admin = JSON.parse(localStorage.getItem("user"))
            if(!admin.isAdmin){
                navigate("/")
            }
            else{
                dispatch(getAllUsers()); 
            }
        } catch(error){
            navigate("/")
        }  
    }, [dispatch])
    
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
    function handlerClickUsers(){
        dispatch(getAllUsers())
        setEvents(false)
        setBlackList(false)
        setOrdersActive(false)
        setUsers(true)
    }
    function handlerClickEvents(){
        dispatch(getEvents())
        setBlackList(false)
        setUsers(false)
        setOrdersActive(false)
        setEvents(true)
    }
    function handlerClickTicketReceipts(){
        dispatch(getAllBlackList())
        setEvents(false)
        setUsers(false)
        setOrdersActive(false)
        setBlackList(true)
    }
    function handleClickOrders(){
        dispatch(getAllTickets())
        setBlackList(false)
        setUsers(false)
        setEvents(false)
        setOrdersActive(true)
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
                    <button className={Style.button} onClick={handlerClickUsers}>Usuario</button>
                    <br />
                    <button className={Style.button} onClick={handlerClickEvents}>Eventos</button>
                    <br />
                    <button className={Style.button} onClick={handleClickOrders}>Ordenes de compra</button>
                    <br />
                    <button className={Style.button} onClick={handlerClickTicketReceipts}>Lista negra</button>
                    <br />
                    <Link to="/events"> <button className={Style.button}>Crear evento</button></Link>
                </div>
        </div>
            <div className={Style.containersInfo}>
            {usersActive ? <AdminUserPanel/> : eventsActive ? <AdminEventPanel/>: blackList ? <AdminBlackListPanel/>:  ordersActive ? <AdminOrdersPanel/> :<h1>Error</h1> }
            </div>
        </div>
        </div>
    )
}

