import React from 'react'
import { useDispatch } from "react-redux";
import { searchEvent } from "../../redux/actions";
import style from './SearchBar.module.css';

export default function SearchBar({setCurrenPag,setCurrentPage}) {

  const dispatch = useDispatch()
  function hadleInputChange(e){
    dispatch(searchEvent(e.target.value))
    setCurrenPag(1)
    setCurrentPage(1)

  }

  function hadleClick(){
    document.getElementById('search').value = ''
    dispatch(searchEvent(''))
    setCurrenPag(1)
    setCurrentPage(1)

  }

  return (
    <div>
      <input maxlength="35" id='search' type = 'text' className={style.searchBar} placeholder = 'Buscar evento...' onChange= {(e)=> hadleInputChange(e)}/>
      <button onClick={hadleClick} className={style.close}>X</button>
    </div>
  )
}
