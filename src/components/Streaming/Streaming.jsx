import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Style from "./Streaming.module.css"
import { useParams, useNavigate } from 'react-router-dom';
import NavBarProfile from "../ProfileUser/NavBarProfile/NavBarProfile.jsx"
import swal from 'sweetalert'
import { useState } from "react";
export default function Streaming(){
    const {id, eventId } = useParams();
    const navigate = useNavigate()
    const [navUser, setNavUser] = useState(false)

    useEffect(() => {
        try {
            let User = JSON.parse(localStorage.getItem("user"))
        if(User){
            let events = User.tickets.filter(ticket => ticket.eventId === eventId)
            setNavUser(true)
        if(events.length <= 0){
            return swal({
                title: 'No tienes un ticket',
                text: 'Necesitas un ticket para poder ver el streaming',
                icon: 'warning',
                dangerMode:true}),navigate("/")
        }
        }
        } catch (error) {
            return swal({
                title: 'No estas logueado',
                text: 'Necesitas estar logueado para ver el streaming',
                icon: 'warning',
                dangerMode:true}),navigate("/")
        }
    },[])
    return(
        <div>
            {navUser ? <div className={Style.containerNavbar}><NavBarProfile/></div>:<></>}
            <div className={Style.container}>
            <div className={Style.divVideo}><iframe className={Style.streaming} src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        </div>
        </div>
    )
}