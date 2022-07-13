import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllLikesEventId } from "../../../redux/actions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Style from "./LikesAdminPanel.module.css"

export default function LikesAdminPanel(event = "undefined"){
    const dispatch = useDispatch()
    const allLikesEventId = useSelector((state)=> state.stateAdminPanel.allLikesEventId)
    useEffect(() => {
        dispatch(getAllLikesEventId(event.idEvent.id))
    },[dispatch])
    return(
        <div className={Style.containerLikes}>
            <FontAwesomeIcon icon={faStar}/><span className={Style.text}>{allLikesEventId.length}</span>
        </div>
    )
}