import React from 'react'
import style from './CardEvent.module.css'


export default function CardEvent({name, schedule, image}) {

  // const date = schedule.split('T')[0]
  // const time = schedule.split('T')[1].split(':')[0]+':'+schedule.split('T')[1].split(':')[1]
  let fechActual = new Date(schedule);
  fechActual = fechActual.toString().split(" ").slice(1,5).join("-");

  return (
    <div >

        <div className = {style.container}>
          <div>
            <img className={style.image} src={image} alt='Event'/>
            <div className={style.name}>{name}</div>
            {/* <div className={style.info}>{date} {time}h.</div> */}
            <div className={style.info}>{fechActual}h.</div>
          </div>
        </div>
    </div>
  )
}
