import React from 'react'
import style from './CardBigEvent.module.css'
import top from '../../img/cartel.png'
import { useSelector } from "react-redux";



export default function CardBigEvent({name, genreId, schedule, image}) {

  const {Genres} = useSelector((state)=> state)

  // const date = schedule.split('T')[0]
  // const time = schedule.split('T')[1].split(':')[0]+':'+schedule.split('T')[1].split(':')[1]
  let fechActual = new Date(schedule);
  fechActual = fechActual.toString().split(" ").slice(1,5).join("-");
  let prueba =''
  if(Genres){
    prueba = Genres.find(e => e.id === genreId)
    // console.log(prueba)
      }


  return (
     
    <div className = {style.container}>
      <div>
        <img className={style.top} src={top} alt=''/>
        <div className={style.topname}>¡Destacado!</div>
        <img className={style.image} src={image} alt='Evento'/>
        <div className={style.name}>{name}</div>
        <div className={style.info}>{prueba !== undefined ? prueba.name.toUpperCase() : null}</div>
        {/* <div className={style.info}>{date} {time}h.</div> */}
        <div className={style.info}>{fechActual}h.</div>
      </div>
    </div>   
  )
}
