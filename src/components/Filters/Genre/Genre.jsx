import React, { useState,useEffect } from 'react'
import { useDispatch} from 'react-redux';
import { filterByGenres,GetGenres } from '../../../redux/actions';
import style from './Genre.module.css';
import { useSelector } from 'react-redux';

export default function Genre({setCurrenPag,setCurrentPage}) {
  const dispatch = useDispatch()
  const [genre, setGenre] = useState("")
  const {Genres} = useSelector(state => state);
  const {AllEvents} = useSelector(state => state);
  
  const HandleFilterByGenres = (e) =>  {
    e.preventDefault()
    dispatch(filterByGenres(e.target.value))
    setGenre(`${e.target.value}`)
    setCurrenPag(1)
    setCurrentPage(1)
  }
    useEffect(()=>{
    dispatch(GetGenres())
  },[])

  return (
    <div>
      <select onChange={e =>{ HandleFilterByGenres(e)}} className={style.selectGenre} name="" id="">
        <option value='all'  className={style.option}>Géneros</option>
        {
          Genres.map(e => {return(
            <option value={e.id} className={style.option}>{e.name[0].toUpperCase() + e.name.substring(1)}</option>
          )})
        }
      </select>
    </div>
  )
}
