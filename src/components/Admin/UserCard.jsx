import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { activeModalUsersPermisedAdminPanel,deleteUser, findUser, findUser2, getAllUsers ,activeModalUsersAdminPanel} from "../../redux/actions";
import swal from 'sweetalert'
import Style from "./UserCard.module.css"

    export default function UserCard({id,username,aux}){

    const dispatch = useDispatch()
    const UserByUserName = useSelector((state) => state.stateAdminPanel?.UserByUserName)
    const userDeleted = useSelector((state) => state.userDeleted)
    const allUsers = useSelector((state) => state.stateAdminPanel?.allUsers)
    console.log(userDeleted)

function filterUser(){
    if(aux){
        dispatch(findUser(UserByUserName, id))
    }else{
        dispatch(findUser(allUsers, id))
    }
    handlerPerfilClick()
}
async function handlerCloseModalPermised(){
    await dispatch(findUser(allUsers, id))
    await dispatch(activeModalUsersPermisedAdminPanel(true))
}
function handlerPerfilClick(){
    dispatch(activeModalUsersAdminPanel(true))
}

async function handlerDeleteUser(){
        await dispatch(deleteUser(id))
        if(userDeleted?.message){
            return swal({
                title: 'Usuario no eliminado',
                text: 'El usuario no se elimino',
                icon: 'error',
                dangerMode:true
            })
        }else{
            return swal({
                title: 'Usuario eliminado',
                text: 'El usuario se elimino con exito',
                icon: 'success',
            }),dispatch(getAllUsers())
        }
    }

    return(
        <div className={Style.cardEvent}>
            <p className={Style.id}>{id}</p>
            <p className={Style.name}>{username}</p>
            <div className={Style.buttonsCard}>
            <button className={Style.button} onClick={handlerDeleteUser}>Borrar</button>
            <button className={Style.button} onClick={filterUser}>Ver Perfil</button>
            <button className={Style.button} onClick={handlerCloseModalPermised}>Permisos</button>
            </div>
        </div>
    )
}