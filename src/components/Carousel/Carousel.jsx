import { Carousel } from "react-responsive-carousel";
import React from 'react'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './Carousel.module.css'
import { useSelector } from "react-redux";




export default function Carrousel() {
const {AllBigEvents} = useSelector(state => state)

  return (
    <div >
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} dynamicHeight={true} showThumbs={false}  centerMode={true}>
            {
              AllBigEvents?.map((e) => {return(
                <div>
                  <img className={style.img} alt='' src={e.performerImage}/>
                  <p className={styles.legend}> {e.artist} </p>
                </div>
              )})
            }
          
        </Carousel>
   
    </div>
  )
}
