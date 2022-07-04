import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {activeModalUsersAdminPanel} from "../../redux/actions"
import Style from "./PerfilUserAdmin.module.css"

export default function PerfilUserAdmin(){
    const userSaved = useSelector((state) => state.userSaved)
    const dispatch = useDispatch()
function handlerCloseClic(){
    dispatch(activeModalUsersAdminPanel(false))
}
    return(
        <div className={Style.containerGeneral}>
<div className={Style.containerInfo}>
    <div className={Style.containerClose}>
        <button className={Style.btnClose} onClick={handlerCloseClic}>x</button>
    </div>
<div className={Style.info}>
                <p>ID: {userSaved.id}</p>
                <p>Nombre: {userSaved.name}</p>
                <p>Username: {userSaved.username}</p>
                <p>Email: {userSaved.email}</p>
                {userSaved.isAdmin ? <p>Administrador</p> : null }
            </div>
</div>
        </div>
    )
}