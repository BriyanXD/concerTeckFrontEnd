import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

export default function AdminSolicit(){
    const allSoli = useSelector((state) => state.stateAdminPanel.allSolicits)
    return(
        <div>
            <div>
                <input type="text" />
            </div>
            <div>
                {allSoli ? allSoli.map(user => {
                    return( <div>
                        <UserCard id={user.id} username={user.name}/>
                    </div> )
        }): <h1>No se encontraron datos de solicutud</h1> }
            </div>
        </div>
    )
}