import React from "react";
import style from './PaginadoBigEvents.module.css'


export default function PaginadoBigEvents({allEventsPagination, eventsPerPag, pagination}){


    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allEventsPagination/eventsPerPag); i++) {
        pageNumber.push(i)
        
    }

    return(
        <div className={style.pagination}>
            {
                pageNumber && pageNumber.map(n =>{
                    return <button className={style.button} key = {n} 
                    onClick = {() => pagination(n)}></button>
                })
            }
        </div>
    )
}