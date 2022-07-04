import React from "react";
import style from './PaginadoEvents.module.css'


export default function PaginadoEvents({allSmallEventsPagination, eventPerPage, pagination2}){


    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allSmallEventsPagination/eventPerPage); i++) {
        pageNumber.push(i)
    }

    return(
        <div className={style.pagination}>
            {
                pageNumber && pageNumber.map(n =>{
                    return <button className={style.button} key = {n} 
                    onClick = {() => pagination2(n)}></button>
                })
            }
        </div>
    )
}