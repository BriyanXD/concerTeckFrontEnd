import React from "react";
import { useSelector, useDispatch } from "react-redux";
import s from './Favorites.module.css'
import CardBigEvent from "../CardBigEvent/CardBigEvent";
import CardEvent from "../CardEvent/CardEvent";
import { RemoveFavorite } from "../../redux/actions";
import FooterFav from "./FooterFav/FooterFav";
import { Link } from "react-router-dom";


export default function Favorites(){
    const {Likes} = useSelector((state)=> state)
    const dispatch = useDispatch()
    const bigEvents = Likes.filter((b)=>b.venue.isBigEvent===true)
    const events = Likes.filter((b)=>b.venue.isBigEvent===false)
    // console.log('likes:', Likes)

    return(
        <div>
            <div>
            <div className={s.container}>
            {
                bigEvents?.map((el)=>{
                    return (
                       
                     <div className={s.containerClose}>
                        <Link style={{ textDecoration: "none" }} to={`/details/${el.id}`}>
                        <CardBigEvent
                        name={el.name}
                        genreId={el.genreId}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                      />
                      </Link>
                      <button className={s.btn} onClick={()=>dispatch(RemoveFavorite(el))}>X</button>

                 </div>
                )})
            }
            {
                events?.map((el)=>{
                    return(
                     <div className={s.containerClose2}>
                        <Link style={{ textDecoration: "none" }} to={`/details/${el.id}`}>
                        <CardEvent
                        name={el.name}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                        />
                        </Link>
                        <button className={s.btn2} onClick={()=>dispatch(RemoveFavorite(el))}> X </button>
                     </div>
                        )
                    })
                }
                </div>
                </div>
                <div>
                    <FooterFav/>
                </div>
            </div>
    )

}