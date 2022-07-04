import React from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

export default function AdminSolicitPanel(){
    const allEvents = useSelector((state) => state.AllEvents)
    return(
        <div>
            <div>
                <input type="text" />
            </div>
            <div>
                {allEvents ? allEvents.map(user => {
                    return( <div>
                        <UserCard id={user.id} username={user.name}/>
                    </div> )
        }): <h1>No hay datos en solicitudes</h1> }
            </div>
        </div>
    )
}