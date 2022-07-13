import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import s from './Favorites.module.css'
import CardBigEvent from "../CardBigEvent/CardBigEvent";
import CardEvent from "../CardEvent/CardEvent";
import {  getLikes, deleteLikes, getEvents } from "../../redux/actions";
import FooterFav from "./FooterFav/FooterFav";
import { Link } from "react-router-dom";


export default function Favorites(){
    const { Likes, AllEvents } = useSelector((state)=> state)
    const dispatch = useDispatch()
    const bigEvents = AllEvents.filter((b)=>b.venue.isBigEvent===true)
    const events = AllEvents.filter((b)=>b.venue.isBigEvent===false)
    let temporal = localStorage.getItem("user")
    let userStorage 
    if(temporal !== "nada"){
      userStorage = JSON.parse(temporal)
    }else{
      userStorage = ""
    }

    useEffect(()=>{
        dispatch(getEvents())
        dispatch(getLikes(userStorage.id))  
    },[dispatch])

    const handleDelete = async (id) =>{
        await dispatch(deleteLikes(id))
        await dispatch(getLikes(userStorage.id))
    }

    return(
        <div className={s.all}>
        <div className={s.container}>
            <div className={s.title}>
                <h3>Eventos guardados como Favoritos: </h3>
            </div>

            <div >
                <div className={s.bigcontainer}>
                    {Likes?.map((e)=> {
                        return bigEvents?.map((el)=>{
                            if(e.idEvent===el.id){
                                return (
                                    <div className={s.containerClose}>
                                       <Link style={{ textDecoration: "none" }} to={`/${el.id}`}>
                                       <CardBigEvent
                                       name={el.name}
                                       genreId={el.genreId}
                                       image={el.performerImage}
                                       schedule={el.schedule}
                                       id={el.id}
                                     />
                                     </Link>
                                     <button className={s.btn} onClick={()=>handleDelete(e.id)}>X</button>
                                </div>
                               )
                            } return
                        })
                    })
                }
                </div>
                <div className={s.litlecontainer}>
                {Likes.map((e)=>{
                    return events?.map((el)=>{

                        if(e.idEvent===el.id){
                            return (
                                <div className={s.containerClose}>
                                   <Link style={{ textDecoration: "none" }} to={`/${el.id}`}>
                                   <CardEvent
                                   name={el.name}
                                   genreId={el.genreId}
                                   image={el.performerImage}
                                   schedule={el.schedule}
                                   id={el.id}
                                 />
                                 </Link>
                                 <button className={s.btn2} onClick={()=>handleDelete(e.id)}>X</button>
                            </div>
                           )
                        } return
                    })
                })
                }
                </div>

                </div>
                    <Link to='/perfil/:id'>
                         <button className={s.buttonBack}>Volver</button>
                    </Link>
                    {/* <FooterFav/> */}
                {/* <div className={s.footer}>
                </div> */}
            </div>
        </div>
    )

}