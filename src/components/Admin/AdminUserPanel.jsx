import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import PerfilUserAdmin from "./PerfilUserAdmin";
import AdminUserPermised from "./AdminUserPermised";
import {searchUserByUserName, getAllUsers} from "../../redux/actions"
import Style from "./AdminUserPanel.module.css"
export default function AdminUserPanel(){
    const allUsers = useSelector((state) => state.stateAdminPanel?.allUsers)
    // const UserByName = useSelector((state) => state.stateAdminPanel?.UserByName)
    const UserByUserName = useSelector((state) => state.stateAdminPanel?.UserByUserName)
    const modalUser = useSelector((state) => state.stateAdminPanel?.modalUser)
    const modalUserPermised = useSelector((state) => state.stateAdminPanel?.modalUserPermised)
    const dispatch = useDispatch()

    function handleInputChange(e){
        e.preventDefault();
        // dispatch(searchUserByName())
        dispatch(searchUserByUserName(e.target.value))
    }

     useEffect(()=>{
        dispatch(getAllUsers())
     },[])

    return(
        <div>
            <div className={Style.SearchBardiv}>
                <input className={Style.SearchBar} type="text" placeholder="Buscar por nombre de usuario" onChange={(e) => handleInputChange(e)} />
            </div>
            <div>
                {
                UserByUserName && UserByUserName.length>0 ?
                UserByUserName.map(user => {
                    return(
                        <div key={user.id}>
                        <UserCard aux={true} id={user.id} username={user.username}/>
                    </div> )}) 
                :
                allUsers ? allUsers.map(user => {
                    return( <div>
                        <UserCard id={user.id} username={user.username}/>
                    </div> )
        }): <h1>No se encontraron datos de usuarios </h1> }
            </div>
            {modalUser ? <PerfilUserAdmin/>: <></>}
            {modalUserPermised ? <AdminUserPermised/>: <></>}
        </div>
    )
}