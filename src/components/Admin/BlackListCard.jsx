import React from "react"
import { useSelector, useDispatch } from "react-redux";
import {deleteUserBlackList, getAllBlackList} from "../../redux/actions";
import swal from 'sweetalert'
import Style from "./UserCard.module.css"

    export default function BlackListCard({id,email,aux,name}){

    const dispatch = useDispatch()
   /*  const userDeleted = useSelector((state) => state.userDeleted) */
    const userSaveBlackList = useSelector((state) => state.stateAdminPanel?.userSaveBlackList)
    console.log(userSaveBlackList)

async function handlerUnlockClick(){
    await dispatch(deleteUserBlackList(id))
    if(userSaveBlackList?.message){
        return swal({
            title: 'Usuario eliminado',
            text: 'El usuario se elimino con exito',
            icon: 'success',
        })  }else{
            return swal({ 
                text: 'El usuario no se elimino',
                icon: 'error',
                dangerMode:true
            }),dispatch(getAllBlackList())
    }
}

    return(
        <div className={Style.cardEvent}>
            <p className={Style.id}>{id}</p>
            <p>{name}</p>
            <p className={Style.name}>{email}</p>
            <div className={Style.buttonsCard}>
            <button className={Style.button} onClick={handlerUnlockClick}>Desbloquear</button>
            </div>
        </div>
    )
}