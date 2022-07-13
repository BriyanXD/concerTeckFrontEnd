
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './RegisterEvents.module.css';
import { CreateEvent, GetGenres, GetVenues, CreateStock, getEvents } from '../../redux/actions';
import { Link, useNavigate } from "react-router-dom";
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import { Stack, TextField } from '@mui/material';
//import { DateTimePicker } from '@mui/x-date-pickers';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import DateTimePicker from 'react-datetime-picker';
import Footer from '../Footer/Footer';
import RegisterGenre from '../RegisterGenre/RegisterGenre';
import RegisterVenue from '../RegisterVenue/RegisterVenue';
import swal from 'sweetalert';
 

export default function RegisterEvent(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeGenre, setActiveGenre] = useState(false);
    const [activeVenue, setActiveVenue] = useState(false);
    const [repitedEvent, setRepitedEvent] = useState(null);
    const[selectVenuesState, setSelectVenuesState] = useState(false);

    

    const handleClickNewVenue= (value) => {
        setEvent({
            ...event,
            venueId: ''
        })
        setSelectVenuesState(!selectVenuesState)
        setActiveVenue(value)
    }



    const [activeStockGeneral , setActiveStockGeneral] = useState({
        stock: "",
        price:""
    });
    const [activeLateralStock, setActiveLateralStock] = useState({
        stock: "",
        price:""
    });
    const [activePalcoStock, setActivePalcoStock] = useState({
        stock: "",
        price:""
    });
    const [activeVIPStock, setActiveVIPStock] = useState({
        stock: "",
        price:""
    });
    const [activeStreamingStock, setActiveStreamingStock] = useState({
        stock: "",
        price:""
    });
    const [foundVenue, setFoundVenue] = useState(null);

    const [dateTime, setDateTime] = useState(new Date());
    const Allevents = useSelector((state) => state.AllEvents);
    const genres = useSelector((state)=> state.Genres);
    const venues = useSelector((state) => state.Venues);
    const [event, setEvent] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: "",
        stockId: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: "",
        stockId: ""
    });
    const [stock, setStock] = useState({
        id: "",
        stockStreaming: 0,
        stockkVIP: 0,
        stockGeneral: 0,
        stockGeneralLateral: 0,
        stockPalco: 0,
        streamingPrice: 0,
        vipPrice:0,
        generalLateralPrice: 0,
        generalPrice:0,
        palcoPrice: 0,
        venueId: "",
    });

    useEffect(()=>{
        try{
            const admin = JSON.parse(localStorage.getItem("user"))
            if(!admin.isAdmin){
                navigate("/")
            }
            else{
                dispatch(GetGenres());
                dispatch(GetVenues());
                dispatch(getEvents());
            }
        } catch(error){
            navigate("/")
        }  
    }, [dispatch])

    const handleChange = async(e) => {
        // let fechaActual = dateTime;
        // //fechaActual = fechaActual.toUTCString();
        // fechaActual = fechaActual.toString();
        if(e.target.name === "venueId"){
            await setEvent({
                ...event,
                venueId: e.target.value,
            })
            await setStock({
                ...stock,
                venueId: e.target.value,
            });
            await setFoundVenue(
                venues.find(v => v.id === e.target.value)
            );
            console.log("Se Encontró El Venue Relacionado", foundVenue)
            return 
        }
         else if(e.target.name === "schedule"){
            //await setDateTime(e.taget.value);
            await setEvent({
                ...event,
                schedule: dateTime,
                stockId: stock.id,
            });
            await setStock({
                ...stock,
                id: event.name + event.artist + event.schedule
            });
        }
        else if(e.target.name === "name"){
            await setEvent({
                ...event,
                name: e.target.value,
                stockId: stock.id,
            });
            await setStock({
                ...stock,
                id: event.name + event.artist + event.schedule
            });
        }
        else if(e.target.name === "artist"){
            await setEvent({
                ...event,
                artist: e.target.value,
                stockId: stock.id,
            });
            await setStock({
                ...stock,
                id: event.name + event.artist + event.schedule
            });
        }
        else if(e.target.name === "description"){
            await setEvent({
                ...event,
                description: e.target.value
            })
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese una descripción del evento"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
            return 
        }
        await setEvent({
            ...event,
            schedule: dateTime,
            [e.target.name]: e.target.value
        });
        await setStock({
            ...stock,
            id: event.name + event.artist + event.schedule
        });
            // if(event.name !== "" && event.artist !== "" && event.schedule !== ""){
            //     await setStock({
            //         ...stock,
            //         id: event.name + event.artist + event.schedule
            //     });
            // }
            // if(stock.id !== ""){
            //     await setEvent({
            //         ...event,
            //         stockId: stock.id
            //     });
            // }
    };

    const handleStock = async(e) =>{
        await setStock({
            ...stock,
            id: event.name + event.artist + event.schedule,
            [e.target.name]: Number(e.target.value)
        });
        //if(stock.id !== ""){
        await setEvent({
            ...event,
            stockId: stock.id
        });
        //}
    };

    const handleAddStock = async(e) => {
        e.preventDefault();
        if(stock.stockGeneral === 0 || stock.generalPrice === 0){
            setActiveStockGeneral({
                stock: stock.stockGeneral === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.generalPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockGeneralLateral !== 0 && (stock.stockGeneralLateral === 0 || stock.generalLateralPrice === 0)){
            setActiveLateralStock({
                stock: stock.stockGeneralLateral === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.generalLateralPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockPalco !== 0 && (stock.stockPalco === 0 || stock.palcoPrice === 0)){
            setActivePalcoStock({
                stock: stock.stockPalco === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.palcoPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockStreaming !== 0 && (stock.stockStreaming === 0 || stock.streamingPrice === 0)){
            setActiveStreamingStock({
                stock: stock.stockStreaming === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.streamingPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        if (foundVenue.maxStockVIP !== 0 && (stock.stockkVIP === 0 || stock.vipPrice === 0)){
            setActiveVIPStock({
                stock: stock.stockkVIP === 0 ? "Ingrese la cantidad de entradas disponibles" : "",
                price: stock.vipPrice === 0 ? "Ingrese el precio de las entradas" : ""
            })
            return 
        }
        const stockCreated = await dispatch(CreateStock(stock));
        console.log("AQUI EL STOCK CREADO", stockCreated);
        if(stockCreated.data[0]){
            swal({
                text: "Stock añadido con éxito",
                icon: 'success',
            })
            setStock({
                id: "",
                stockStreaming: 0,
                stockkVIP: 0,
                stockGeneral: 0,
                stockGeneralLateral: 0,
                stockPalco: 0,
                streamingPrice: 0,
                vipPrice:0,
                generalLateralPrice: 0,
                generalPrice:0,
                palcoPrice: 0,
                venueId: "",
            });
        }    
    };

    const ControlDoNotRepeat = async(newEvent) =>{
        let fechActual = new Date(newEvent.schedule);
        fechActual = fechActual.toISOString()
        const sameTime = Allevents.find(e => e.schedule === fechActual);
        if(sameTime && sameTime.venueId === newEvent.venueId){
            swal({
                title: "Ya existe otro evento ocupando el mismo lugar a la misma fecha y hora",
                icon: 'warning',
                dangerMode:true})
            return setRepitedEvent(false)
        }
        else if(sameTime && sameTime.artist === newEvent.artist && sameTime.venueId !== newEvent.venueId){
            swal({
                title: "Ya existe otro evento en otro lugar donde el artista deba cantar en la misma fecha y hora",
                icon: 'warning',
                dangerMode:true})
            return setRepitedEvent(false)
        }
        else {
            return setRepitedEvent(true)
             
        }
    }

    const handleSubmitEvent = async(e) => {
        e.preventDefault();
        if( errors.name !== "" ||
        errors.artist !== "" ||
        errors.genreId !== "" ||
        errors.schedule !== "" || event.schedule === "" ||
        errors.performerImage !== "" ||
        errors.placeImage !== "" ||
        errors.description !== "" ||
        errors.venueId !== "" ||
        errors.stockId !== "" ){
            swal({
                title: 'No se pudo registrar evento.',
                text: "Solucione los errores",
                icon: 'warning',
                dangerMode:true})

            console.log("ERRORES EVENTO", errors)
        }
        if ( event.name === "" ||
        event.artist === "" ||
        event.genreId === "" ||
        event.schedule === "" ||
        event.performerImage === "" ||
        event.placeImage === "" ||
        event.description === "" ||
        event.venueId === "" ||
        event.stockId === "" ){
            setErrors({
                name: event.name === "" ? "Ingrese el nombre del Evento" : "",
                artist: event.artist === "" ? "Ingrese el nombre del artista del Evento" : "",
                genreId: event.genreId === "" ? "Ingrese el género del Evento" : "",
                schedule: event.schedule === "" ? "Ingrese la fecha y hora del Evento" : "",
                performerImage: event.performerImage === "" ? "Ingrese la imagen del artista" : "",
                placeImage: event.placeImage === "" ? "Ingrese la imagen del lugar del Evento" : "",
                description: event.description === "" ? "Ingrese una descripción del evento" : "",
                venueId: event.venueId === "" ? "Ingrese el lugar del evento" : "",
                stockId: event.stockId === "" ? "Se debe llenar el formulario de stock" : ""
            });
            return
        }
        await ControlDoNotRepeat(event);
        if(repitedEvent === true){
            await handleAddStock(e);
            await dispatch(CreateEvent(event));
            swal({
                text: "Evento creado exitosamente",
                icon: 'success',
            })

            setEvent({
                name: "",
                artist: "",
                genreId: "",
                schedule: "",
                performerImage: "",
                placeImage: "",
                description: "",
                venueId: "",
                stockId: "",
            });
            setFoundVenue(null);
            navigate("/")
        }
        else {
            // swal({
            //     title: `${repitedEvent}`,
            //     icon: 'warning',
            //     dangerMode:true})
            return
        }
    };

    const handleBlur = (e) => {
        //validar nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el nombre del Evento"
                })
            }else if (!/^[a-zA-ZÀ-ÿ\s\d]*$/.test(e.target.value)){ //!/^[a-zA-ZÀ-ÿ\s\d]{1,40}$/.test(e.target.value)
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese un nombre válido"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }
        //validar artista
        if(e.target.name === "artist"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el nombre del artista del Evento"
                })
            }else if (!/^[a-zA-Z\s]{2,254}$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese un nombre válido"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }
        //validar genero
        if(e.target.name === "genreId"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el género del Evento"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }
        //validar fecha/calendario

        //validar imagen del artista
        if(e.target.name === "performerImage"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la imagen del artista"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }
        //validar imagen del evento
        if(e.target.name === "placeImage"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la imagen del lugar del Evento"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }
        //validar Lugar/Venue
        if(e.target.name === "venueId"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el lugar del evento"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }
        //validar descripcion
        // if(e.target.name === "description"){
        //     if(e.target.value === ""){
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: "Ingrese una descripción del evento"
        //         })
        //     } else {
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: ""
        //         })
        //     }    
        // }
    };

    const handleBlurStock = (e) => {
        //STOCK GENERAL
        if(e.target.name === "stockGeneral"){
            if(e.target.value === 0){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: "Ingrese un valor numérico"
                })
            }
            else if(e.target.value > foundVenue.maxStockGeneral){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: `El stock general NO debe superar las ${foundVenue.maxStockGeneral} entradas`
                })
            }
            else {
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    stock: ""
                })
            }
        }
        //PRECIO GENERAL
        if(e.target.name === "generalPrice"){
            if(e.target.value === 0){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    price: "Ingrese un valor numérico"
                })
            }
            else {
                setActiveStockGeneral({
                    ...activeStockGeneral,
                    price: ""
                })
            }
        }
        //STOCK LATERAL
        if(foundVenue.maxStockGeneralLateral !== 0 && e.target.name === "stockGeneralLateral"){
            if(e.target.value === 0){
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: "Ingrese un valor numérico"
                })
            }
            else if(e.target.value > foundVenue.maxStockGeneralLateral){
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: `El stock general lateral NO debe superar las ${foundVenue.maxStockGeneralLateral} entradas`
                })
            }
            else {
                setActiveLateralStock({
                    ...activeLateralStock,
                    stock: ""
                })
            }
        }
        //PRECIO LATERAL
        if(foundVenue.maxStockGeneralLateral !== 0 && e.target.name === "generalLateralPrice"){
            if(e.target.value === 0){
                setActiveLateralStock({
                    ...activeLateralStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveLateralStock({
                    ...activeLateralStock,
                    price: "Ingrese un valor numérico"
                })
            }
            else {
                setActiveLateralStock({
                    ...activeLateralStock,
                    price: ""
                })
            }
        }
        //STOCK PALCO
        if(foundVenue.maxStockPalco !== 0 && e.target.name === "stockPalco"){
            if(e.target.value === 0){
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: "Ingrese un valor numérico"
                })
            }
            else if(e.target.value > foundVenue.maxStockPalco){
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: `El stock de Palco NO debe superar las ${foundVenue.maxStockPalco} entradas`
                })
            }
            else {
                setActivePalcoStock({
                    ...activePalcoStock,
                    stock: ""
                })
            }
        }
        //PRECIO PALCO
        if(foundVenue.maxStockPalco !== 0 && e.target.name === "palcoPrice"){
            if(e.target.value === 0){
                setActivePalcoStock({
                    ...activePalcoStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActivePalcoStock({
                    ...activePalcoStock,
                    price: "Ingrese un valor numérico"
                })
            }
            else {
                setActivePalcoStock({
                    ...activePalcoStock,
                    price: ""
                })
            }
        }
        //STOCK STREAMING
        if(foundVenue.maxStockStreaming !== 0 && e.target.name === "stockStreaming"){
            if(e.target.value === 0){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: "Ingrese un valor numérico"
                })
            }
            else if(e.target.value > foundVenue.maxStockStreaming){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: `El stockde Streaming NO debe superar las ${foundVenue.maxStockStreaming} entradas`
                })
            }
            else {
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    stock: ""
                })
            }
        }
        //PRECIO STREAMING
        if(foundVenue.maxStockStreaming !== 0 && e.target.name === "streamingPrice"){
            if(e.target.value === 0){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    price: "Ingrese un valor numérico"
                })
            }
            else {
                setActiveStreamingStock({
                    ...activeStreamingStock,
                    price: ""
                })
            }
        }
        //STOCK VIP
        if(foundVenue.maxStockVIP !== 0 && e.target.name === "stockkVIP"){
            if(e.target.value === 0){
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: "Ingrese la cantidad de entradas disponibles"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: "Ingrese un valor numérico"
                })
            }
            else if(e.target.value > foundVenue.maxStockVIP){
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: `El stock VIP NO debe superar las ${foundVenue.maxStockVIP} entradas`
                })
            }
            else {
                setActiveVIPStock({
                    ...activeVIPStock,
                    stock: ""
                })
            }
        }
        //PRECIO VIP
        if(foundVenue.maxStockVIP !== 0 && e.target.name === "vipPrice"){
            if(e.target.value === 0){
                setActiveVIPStock({
                    ...activeVIPStock,
                    price: "Ingrese el precio de las entradas"
                })
            }
            else if (!/^[0-9]*$/.test(e.target.value)){
                setActiveVIPStock({
                    ...activeVIPStock,
                    price: "Ingrese un valor numérico"
                })
            }
            else {
                setActiveVIPStock({
                    ...activeVIPStock,
                    price: ""
                })
            }
        }

    }

    //k484vqmp codigo carpeta clodinari
    const uploadImage = async (e) => {
        //console.log(e.target.id)
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "k484vqmp");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqrirzlrv/image/upload",
          { method: "POST", body: data }
        );
        const file = await res.json();
        setEvent({...event, [e.target.id]:file.secure_url });
      };


    //console.log para chequear lo que se esta guardando en el formulario
    console.log("SETEANDO EVENTO", event);
    console.log("SETEANDO STOCK: ", stock);

    return (
        <div className={style.container}>
            {/* <NavBar/> */}
    <div className={style.card}>
        <div className={style.h2}><h2>Crear Evento</h2></div>
        <form onSubmit={handleSubmitEvent}>
            <div> 
                <input
                    name="name" 
                    value={event.name}  
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    type="text"
                    className={errors.name?.length> 0 ? style.error : style.inputText}
                    placeholder={errors.name?.length> 0 ? errors.name : "Nombre del evento"}/>
            </div>
            <div> 
                <input 
                    name="artist" 
                    value={event.artist}  
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    type="text"
                    className={errors.artist?.length> 0 ? style.error : style.inputText}
                    placeholder={errors.artist?.length> 0 ? errors.artist : "Artista"}/>
            </div>

            <div className={style.select}> 
                <label 
                    className={errors.schedule?.length > 0 ? style.errorSchedule : style.schedule}>
                    {errors.schedule?.length > 0 ? errors.schedule : "Fecha y Hora del evento:"} 
                </label>
            </div>
            <div> 
                <DateTimePicker 
                name="schedule" 
                value={dateTime} 
                onChange={setDateTime} 
                minDate={new Date()} format="y-MM-dd h:mm:ss a"/> 
            </div>
            
            <div className={style.select}>
                <label 
                className={errors.genreId?.length > 0 ? style.errorGenre : style.label}>
                    {errors.genreId?.length > 0 ? errors.genreId :"Seleccionar género existente:"} 
                </label>
            </div>
            <div className={style.filter}>
                <select name="genreId" onChange={handleChange} className={style.genreLocation}>
                    <option>Géneros</option>
                    {genres.map(g =>(<option className={style.optionGenreLoc} key={g.id} value={g.name}>{g.name[0].toUpperCase() + g.name.substring(1)}</option>))}
                </select>
                <button 
                    type="button" 
                    onClick={()=>setActiveGenre(!activeGenre)}
                    className={style.btnGenre}
                    >Añadir nuevo género</button>
            </div>
            <div>{activeGenre ? <RegisterGenre/>:null}</div>
                
            <div className={style.select}>
                <label className={errors.performerImage?.length > 0 ? style.errorImg : style.img}>
                    {errors.performerImage?.length > 0 ? errors.performerImage : "Imagen del Artista:"} 
                 </label>
            </div>    
            <div className={style.file}>
                <input 
                    id="performerImage" 
                    name="file" 
                    onChange={(e) => uploadImage(e)} 
                    onBlur={handleBlur} 
                    type="file"
                    className={errors.performerImage?.length > 0 ? style.errorImg : style.img}/>
            </div>
            <div>{event.performerImage ? <div><img className={style.imageRender} src={event.performerImage}/></div> : null}</div>

            <div className={style.select}>
                 <label className={errors.placeImage?.length > 0 ? style.errorImg : style.img}>
                    {errors.placeImage?.length > 0 ? errors.placeImage : "Imagen del lugar"}
                 </label>
            </div>
            <div>
                  <input 
                    id="placeImage" 
                    name="file" 
                    onChange={(e) => uploadImage(e)} 
                    onBlur={handleBlur} 
                    type="file"
                    className={errors.placeImage?.length > 0 ? style.errorImg : style.img}
                    /> 
            </div>
            <div>{event.placeImage ? <div><img className={style.imageRender} src={event.placeImage}/></div> : null}</div>

            <div className={style.containerDescription}> 
                <textarea 
                    name="description" 
                    value={event.description}  
                    onChange={handleChange} 
                    type="text"
                    className={errors.description?.length> 0 ? style.error : style.description}  //className={style.description} 
                    placeholder={errors.description?.length> 0 ? errors.description : "Descripción del evento"}   
                /> 
            </div>
            
            <div className={style.select}>
                <label className={style.label}>Seleccionar lugar del evento: </label>
            </div>
            <div className={style.filter}>
                <select name="venueId" disabled={selectVenuesState} onChange={handleChange} className={style.genreLocation}>
                    <option value='lugares'>Lugares</option>
                    {venues.map(v =>(<option className={style.optionLugares} key={v.id} value={v.id}>{v.name}</option>))}
                </select>
                {errors.venueId && <label>{errors.venueId}</label>}
                <button 
                    type="button" 
                    onClick={()=>handleClickNewVenue(!activeVenue)}
                    className={style.btnLocation}
                    
                    >Añadir nuevo establecimiento</button>
            </div>
            <div>{activeVenue ? <RegisterVenue handleClickNewVenue={handleClickNewVenue}/>:null}</div>
            
            {/* <div> <button type="button" onClick={()=>setActiveStock(!activeStock)}>Desplegar seleccion de stock y precios</button> </div> */}
            <div>{event.venueId === "lugares" ? "seleccione un establecimiento" : event.venueId !== "" && foundVenue !== null ?

            <div>
                <h3 className={style.titlePrice}>Entradas y Precios</h3>
                <div className={style.priceTicket}>
                    <p className={style.ticket}>Tickets General</p>
                    <p>Precio entrada General</p>
                </div>
                <div>
                    <div className={style.inputContainer}>

                        <input 
                            name="stockGeneral" 
                            value={stock.stockGeneral} 
                            onChange={handleStock} 
                            onBlur={handleBlurStock} 
                            type="number"
                            className={activeStockGeneral.stock?.length > 0 ? style.error : style.inputTicket}
                            placeholder={activeStockGeneral.stock?.length > 0 ? activeStockGeneral.stock : "Stock General"} 
                        />  
               
                        <input 
                        name="generalPrice" 
                        value={stock.generalPrice} 
                        onChange={handleStock} 
                        onBlur={handleBlurStock} 
                        type="number"
                        className={activeStockGeneral.price?.length > 0 ? style.error : style.inputPrice}
                        placeholder={activeStockGeneral.price?.length > 0 ? activeStockGeneral.price : "Precio General"}
                        />
                    </div>

                     <div className={style.maxTickets}>
                         <label>Tickets Generales: máximo {foundVenue? foundVenue.maxStockGeneral : null} entradas.</label>     
                     </div>
                </div>

                    <div>{foundVenue?.maxStockGeneralLateral !== 0 ? 
                        <div>
                            <div className={style.priceTicket}>
                                <p className={style.ticket}>Tickets General lateral</p>
                                <p>Precio entrada General lateral</p>
                            </div>
                            <div>
                                <div className={style.inputContainer}>
                                    <input 
                                        name="stockGeneralLateral" 
                                        value={stock.stockGeneralLateral} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activeLateralStock.stock?.length > 0 ? style.error : style.inputTicket}
                                        placeholder={activeLateralStock.stock?.length > 0 ? activeLateralStock.stock : "Stock Lateral"} 
                                    />  
                                    <input 
                                        name="generalLateralPrice" 
                                        value={stock.generalLateralPrice} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activeLateralStock.price?.length > 0 ? style.error : style.inputPrice}
                                        placeholder={activeLateralStock.price?.length > 0 ? activeLateralStock.price : "Precio Lateral"}
                                        />
                                </div>
                            <div className={style.maxTickets}>
                                <label>Tickets Lateral: máximo {foundVenue? foundVenue.maxStockGeneralLateral : null} entradas.</label>
                            </div>
                            </div>
                            </div> : null }
                        </div>
                            

                    <div>{foundVenue?.maxStockPalco !== 0 ? 
                        <div>
                            <div className={style.priceTicket}>
                                <p className={style.ticket}>Tickets Palco</p>
                                <p>Precio entrada Palco</p>
                            </div>
                            
                            <div>
                                <div className={style.inputContainer}>
                                    <input 
                                        name="stockPalco" 
                                        value={stock.stockPalco} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activePalcoStock.stock?.length > 0 ? style.error : style.inputTicket}
                                        placeholder={activePalcoStock.stock?.length > 0 ? activePalcoStock.stock : "Stock Palco"} 
                                    />  
                                    <input 
                                        name="palcoPrice" 
                                        value={stock.palcoPrice} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activePalcoStock.price?.length > 0 ? style.error : style.inputPrice}
                                        placeholder={activePalcoStock.price?.length > 0 ? activePalcoStock.price : "Precio Palco"}
                                        />
                                    </div>
                            </div>
                            <div className={style.maxTickets}>
                                <label >Tickets Palco: máximo {foundVenue? foundVenue.maxStockPalco: null} entradas.</label>
                            </div>
                        </div> : null}
                    </div>

                    <div>{foundVenue?.maxStockStreaming !== 0 ? 
                        <div>
                            <div className={style.priceTicket}>
                                <p className={style.ticket}>Tickets Streaming</p>
                                <p>Precio entrada Streaming</p>
                            </div>

                            <div>
                                <div className={style.inputContainer}>
                                    <input 
                                        name="stockStreaming" 
                                        value={stock.stockStreaming} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activeStreamingStock.stock?.length > 0 ? style.error : style.inputTicket}
                                        placeholder={activeStreamingStock.stock?.length > 0 ? activeStreamingStock.stock : "Stock Streaming"} 
                                    />  
                                    <input 
                                        name="streamingPrice" 
                                        value={stock.streamingPrice} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activeStreamingStock.price?.length > 0 ? style.error : style.inputPrice}
                                        placeholder={activeStreamingStock.price?.length > 0 ? activeStreamingStock.price : "Precio Streaming"}
                                        />
                                </div>
                            </div>
                            <div className={style.maxTickets}>
                                <label>Tickets Streaming: máximo {foundVenue? foundVenue.maxStockStreaming: null} entradas.</label>     
                            </div>
                        </div> : null}
                    </div>

                    <div>{foundVenue?.maxStockVIP !== 0 ? 
                        <div>
                            <div className={style.priceTicket}>
                                <p className={style.ticket}>Tickets VIP</p>
                                <p>Precio entrada VIP</p>
                            </div>

                            <div>
                                <div className={style.inputContainer}>
                                    <input 
                                        name="stockkVIP" 
                                        value={stock.stockkVIP} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activeVIPStock.stock?.length > 0 ? style.error : style.inputTicket}
                                        placeholder={activeVIPStock.stock?.length > 0 ? activeVIPStock.stock : "Stock VIP"} 
                                    />  
                                    <input 
                                        name="vipPrice" 
                                        value={stock.vipPrice} 
                                        onChange={handleStock} 
                                        onBlur={handleBlurStock} 
                                        type="number"
                                        className={activeVIPStock.price?.length > 0 ? style.error : style.inputPrice}
                                        placeholder={activeVIPStock.price?.length > 0 ? activeVIPStock.price : "Precio VIP"}
                                        />
                                </div>
                            </div>
                            <div className={style.maxTickets}>
                                <label>Tickets VIP: máximo {foundVenue? foundVenue.maxStockVIP: null} entradas.</label>     
                            </div>
                        </div> : null}
                    </div>
                </div> 
            : null }</div>
            <div containerBtn>
                <Link to='/perfil/panelAdmin'><button className={style.btn}>Volver al Panel</button></Link>
                <button type="submit" className={style.btn}>Crear Evento</button>
            </div>
 
        </form>

       </div>
        <div className={style.footer}>
        <Footer/>
         </div>
    </div>)
};