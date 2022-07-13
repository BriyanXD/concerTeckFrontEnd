import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { OrderByDate } from '../../../redux/actions'
import style from './Date.module.css';

export default function Date(setCurrenPag,setCurrentPage) {
  const dispatch = useDispatch()
  const [date, setDate] = useState("")

  const handleOrderByReleased = (e) =>  {
    e.preventDefault()
    dispatch(OrderByDate(e.target.value))
    setDate(`${e.target.value}`)
    setCurrenPag(1)
    setCurrentPage(1)
  }
  return (
       <div>
            <select name="" id="" className={style.date} onChange={e =>{ handleOrderByReleased(e)}}>
                <option className={style.option}>Orden Por Fecha</option>
                <option value="asc" className={style.option}>Eventos más Próximos</option>
                <option value='des' className={style.option}>Últimos Eventos</option>
            </select> 
        </div> 
      
    // <div>Date</div>
  )
}
