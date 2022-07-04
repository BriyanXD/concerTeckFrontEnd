import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './RegisterEvents.module.css';
import { CreateEvent, GetGenres, CreateGenre, GetVenues } from '../../redux/actions';
import { Link, useNavigate } from "react-router-dom";
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import { Stack, TextField } from '@mui/material';
//import { DateTimePicker } from '@mui/x-date-pickers';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import DateTimePicker from 'react-datetime-picker';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import { useLocalStorage } from '../useLocalStorage/useLocalStorage';
import RegisterGenre from '../RegisterGenre/RegisterGenre';

function validateGenre(genre){
    const error = {};
    if(!genre.name){
        error.name = 'Campo obligatorio'
    }
    if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
        error.name = "Ingrese un nombre con caracteres validos"
    }
    return error
}


export default function RegisterEvent(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeGenre, setActiveGenre] = useState(false)
    //const [dateTime, setDateTime] = useState(null);
    const [value, onChange] = useState(new Date());
    const genres = useSelector((state)=> state.Genres);
    const venues = useSelector((state) => state.Venues);
    const [errorGenre, setErrorGenre] = useState({});
    const [genre, setGenre] = useState({
        name: ""
    })
    const [event, setEvent] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        //duration: "",  //nueva propiedad, duracion del evento
        performerImage: "",
        placeImage: "",
        description: "",
        venueId: 0,
        stockId: 0,
    })

    const [errors, setErrors] = useState({
        name: "",
        artist: "",
        genreId: "",
        schedule: "",
        //duration: "",  //nueva propiedad, duracion del evento
        performerImage: "",
        placeImage: "",
        venueId: "",
    })

    useEffect(()=>{
        dispatch(GetGenres());
        dispatch(GetVenues());  
    }, [dispatch]) 

    const handleChange = (e) => {
        if(e.target.name === "venueId"){
            setEvent({
                ...event,
                [e.target.name]: Number(e.target.value),
                stockId: Number(e.target.value)
            })
            return 
        }
        setEvent({
            ...event,
            schedule: value,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if( errors.name !== "" ||
        errors.artist !== "" ||
        errors.genreId !== "" ||
        errors.schedule !== "" ||
        //errors.duration !== "" ||
        errors.performerImage !== "" ||
        errors.placeImage !== "" ||
        //errors.description !== "" ||
        errors.venueId !== "" ){
            alert("Para poder registrar el Evento deben solucionarse los errores");
        }
        if ( event.name === "" ||
        event.artist === "" ||
        event.genreId === "" ||
        event.schedule === "" ||
        //event.duration === "" ||
        event.performerImage === "" ||
        event.placeImage === "" ||
        event.venueId === 0 ){
            setErrors({
                name: event.name === "" ? "Ingrese el nombre del Evento" : "",
                artist: event.artist === "" ? "Ingrese el nombre del artista del Evento" : "",
                genreId: event.genreId === "" ? "Ingrese el genero del Evento" : "",
                schedule: event.schedule === "" ? "Ingrese la fecha y hora del Evento" : "",
                //duration: event.duration === "" ? "Ingrese la duracion del Evento" : "",
                performerImage: event.performerImage === "" ? "Ingrese la imagen del artista" : "",
                placeImage: event.placeImage === "" ? "Ingrese la imagen del lugar del Evento" : "",
                venueId: event.venueId === 0 ? "Ingrese el lugar del evento" : ""
            });
            return
        }
        dispatch(CreateEvent(event));
        alert("Evento creado exitosamente");
        setEvent({
            name: "",
            artist: "",
            genreId: "",
            schedule: "",
            performerImage: "",
            placeImage: "",
            description: "",
            venueId: 0,
            stockId: 0,
        });
        navigate("/")
    };

    const handleBlur = (e) => {
        
        //validar nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese el nombre del Evento"
                })
            }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
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
            }else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese un nombre sin numeros o caracteres especiales"
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
                    [e.target.name]: "Ingrese el genero del Evento"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }    
        }

        //validar fecha/calendario
        if(e.target.name === "schedule"){
            if(e.target.value === ""){
                setErrors({
                    ...errors,
                    [e.target.name]: "Ingrese la fecha y hora del Evento"
                })
            } else {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            }
        }

        //validar la duracion
        // if(e.target.name === "duration"){
        //     if(e.target.value === ""){
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: "Ingrese la duracion del Evento"
        //         })
        //     } else {
        //         setErrors({
        //             ...errors,
        //             [e.target.name]: ""
        //         })
        //     }
        // }

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
            if(e.target.value === 0){
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
    };


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


    const handleGenre = (e) => {
        setGenre({
            [e.target.name]: e.target.value
        })
        setErrorGenre(validateGenre({
            [e.target.name]: e.target.value 
        }))   
    };

    const handeSubmitGenre = async(e) => {
        e.preventDefault();
        if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
            return alert("Ingrese un nombre con caracteres validos")
        } else {
            const genreCreated = await dispatch(CreateGenre(genre));
            //console.log(genreCreated)
            if(genreCreated.data[0].name){
                dispatch(GetGenres());
                alert("Genero añadido a la lista");
                setGenre({
                    name: ""
                })
                setActiveGenre(!activeGenre)
            }
            //navigate("/events")
        }
    };


    //console.log para chequear lo que se esta guardando
    console.log(event)
    return (
        <div className={style.container}>
            {/* <NavBar/> */}
    <div className={style.card}>
        <div className={style.h2}><h2>Crear Evento</h2></div>
        <form onSubmit={handleSubmitEvent}>
            <div> <input name="name" value={event.name}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Nombre del evento" /> {errors.name && <label className={style.error}>{errors.name}</label>}</div>
            <div> <input name="artist" value={event.artist}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Artista" /> {errors.artist && <label className={style.error}>{errors.artist}</label>}</div>

            <div>
                <label className={style.label}>Seleccionar genero existente: </label>
                <select name="genreId" onChange={handleChange}>
                    <option>Generos</option>
                    {genres.map(g =>(<option key={g.id} value={g.name}>{g.name}</option>))}
                </select>
                {errors.genreId && <label>{errors.genreId}</label>}
                <button type="button" onClick={()=>setActiveGenre(!activeGenre)}>Añadir nuevo genero +</button>
            </div>
            {/* <div>{activeGenre ? <div>
                    <div> <input name="name" value={genre.name}  onChange={handleGenre} type="text" placeholder="Nombrar nuevo genero" />{errorGenre.name && (<label>{errorGenre.name}</label>)} </div>
                    <button onClick={handeSubmitGenre}>Añadir</button>
            </div>:null }</div> */}
            <div>{activeGenre ? <RegisterGenre/>:null}</div>

            <div> <DateTimePicker onChange={onChange} value={value} minDate={new Date()} format="y-MM-dd h:mm:ss a"/> {errors.schedule && <label className={style.error}>{errors.schedule}</label>} </div>
            
            {/* <div> <input id="duration" name="file" onChange={(e) => handleChange(e)} onBlur={handleBlur} type="time" placeholder="Duracion del evento" /> {errors.duration && <label className={style.error}>{errors.duration}</label>}</div> */}

            <div> <input id="performerImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del artista" /> Imagen del Artista {errors.performerImage && <label className={style.error}>{errors.performerImage}</label>}</div>
            <div> <input id="placeImage" name="file" onChange={(e) => uploadImage(e)} onBlur={handleBlur} type="file" placeholder="Imagen del lugar" /> Imagen del Lugar {errors.placeImage && <label className={style.error}>{errors.placeImage}</label>}</div>

            <div>
                <label className={style.label}>Seleccionar lugar del evento: </label>
                <select name="venueId" onChange={handleChange}>
                    <option>Lugares</option>
                    {venues.map(v =>(<option key={v.id} value={v.id}>{v.name}</option>))}
                </select>
                {errors.venueId && <label>{errors.venueId}</label>}
            </div>
            
            <div> <textarea name="description" value={event.description}  onChange={handleChange} onBlur={handleBlur} type="text" placeholder="Descripcion" /> {errors.description && <label>{errors.description}</label>}</div>
            
            <Link to='/'><button >Volver a inicio</button></Link>
            
            <button type="submit">Crear</button>
        </form>

       </div>
        <div className={style.footer}>
        <Footer/>
         </div>
    </div>)
};