import React,{ useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import Style from "./PerfilEventAdmin.module.css"
import { activeModalEventsAdminPanel,putUrlStreamingEvent, putDataEvent} from "../../redux/actions"
import BarGraph from "../BarGraph/BarGraph"
import PolarGraph from "../PolarGraph/PolarGraph"
import LikesAdminPanel from "./LikesAdminPanel/LikesAdminPanel"
import swal from 'sweetalert'

export default function PerfilEventAdmin(){

    const [urlStreaming, setUrlStreaming] = useState()
    const eventSaved = useSelector((state) => state.eventSaved)
    const allEmails = useSelector((state) => state.stateAdminPanel.allEmails)
    const [stateInputs, setStateInputs] =useState({
        name:"",
        artist:"",
        description:"",
        schedule:"",
        placeImage:"",
        performerImage:""
    })
    const dispatch = useDispatch()
    console.log(eventSaved)
    function andlerCloseButton(){
        dispatch(activeModalEventsAdminPanel(false))
    }
    function handlerChangeInputs(e){
        setStateInputs({
            ...stateInputs,
            [e.target.name]:e.target.value
        })
    }
    function handlerUrlStreamingClic(){
        if(!urlStreaming){
            return swal({
                title: 'Faltan datos',
                text: 'Ingrese una URL',
                icon: 'error',
                dangerMode:true

        })
        }
        dispatch(putUrlStreamingEvent(urlStreaming,eventSaved.id))
        urlStreamingValidation()
}
    function urlStreamingValidation(){
        if(eventSaved.streaming){
            return swal({
                title: 'URL de streaming',
                text: 'Se agrego con exito',
                icon: 'success',
            })
        }
    }

    function handlerUrlStreamingInput(value){
        setUrlStreaming(value)
    }
    function handleClickSaveUpdateDataEvent(e){
        e.preventDefault()
        dispatch(putDataEvent(stateInputs,eventSaved.id))
    }

    return(
        <div className={Style.containerGeneral}>
            <div className={Style.containerInfo}>
                <div className={Style.containerClose}>
                    <button onClick={andlerCloseButton} className={Style.btnClose}>X</button>
                </div>
                <p className={Style.name}>{eventSaved.name}</p>
                <BarGraph event={eventSaved}/>
                <div className={Style.info}>
                   <div className={Style.containerdatediv}>
                   <div className={Style.containerdate}><span className={Style.dataone}>ID:</span><span>{eventSaved.id}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Artist:</span><span>{eventSaved.artist}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Schedule:</span><span>{eventSaved.schedule}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Description:</span><span>{eventSaved.description}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Streaming:</span><span>{eventSaved.streaming}</span></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Streaming:</span><input type="text" placeholder="Key" onChange={(e)=> {handlerUrlStreamingInput(e.target.value)}}/><button onClick={handlerUrlStreamingClic}>Save</button></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Emails:</span><div className={Style.allEmails}>{allEmails.length >= 1 ? allEmails.map(e => <p className={Style.emails}>{e}</p> ):<p>No hay datos</p>}</div></div>
                    <form action="">
                    <div className={Style.containerdate}><span className={Style.dataone}>Name:</span><input type="text" name="name" placeholder="name" onChange={(e) => handlerChangeInputs(e)} /></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Artist:</span><input type="text" name="artist" placeholder="artist" onChange={(e) => handlerChangeInputs(e)} /></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Description:</span><input type="text" name="description" placeholder="description" onChange={(e) => handlerChangeInputs(e)} /></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>Schedule:</span><input type="text" name="schedule" placeholder="schedule" onChange={(e) => handlerChangeInputs(e)} /></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>PlaceImage:</span><input type="text" name="placeImage" placeholder="placeImage" onChange={(e) => handlerChangeInputs(e)} /></div>
                    <div className={Style.containerdate}><span className={Style.dataone}>PerformerImage:</span><input type="text" name="performerImage" placeholder="performerImage" onChange={(e) => handlerChangeInputs(e)} /></div>
                    <input type="button" value="Save" onClick={(e) => handleClickSaveUpdateDataEvent(e) }/>
                    </form>
                   </div>
                   <div>
                   <LikesAdminPanel idEvent={eventSaved}/>
                   <PolarGraph event={eventSaved}/>
                   </div>
                </div>
            </div>
        </div>
    )
}