import React from "react";
import { useDispatch, useSelector } from "react-redux"
import {upgradeRank, activeModalUsersPermisedAdminPanel} from "../../redux/actions"
import Style from "./AdminUserPermised.module.css"


export default function AdminUserPermised(){
    const dispatch = useDispatch()
    const userSaved = useSelector((state) => state.userSaved)

    function handlerUserPermised(boolean){
        console.log(userSaved, "Usuario Guardado")
         dispatch(upgradeRank(userSaved.id, boolean))
    }
    function handlerCloseModal(){
        dispatch(activeModalUsersPermisedAdminPanel(false))
    }
    return(
        <div className={Style.containerGeneral}>
            <dir className={Style.containerInfo}>
            <div className={Style.containerClose}>
                <button className={Style.buttonClose} onClick={handlerCloseModal}>X</button>
            </div>
            <div className={Style.containerButtons}>
            {userSaved.isAdmin ? <button className={Style.button} onClick={() => handlerUserPermised(false)}>Quitar Admin</button> : <button className={Style.button} onClick={() => handlerUserPermised(true)}>Subir a Admin</button>}
            </div>
            </dir>
        </div>
    )
}