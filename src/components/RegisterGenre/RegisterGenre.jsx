
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateGenre, GetGenres } from '../../redux/actions';
//import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import style from './RegisterGenre.module.css'

// function validate(genre){
//     const error = {};
//     if(!genre.name){
//         error.name = 'Campo obligatorio'
//     }
//     if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
//         error.name = "No ingrese números por favor"
//     }
//     return error
// }

export default function RegisterGenre(){
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    // const genres = useSelector((state)=> state.Genres);
    const [activeGenre, setActiveGenre] = useState(true)
    const [error, setError] = useState({
        name: ""
    });
    const [genre, setGenre] = useState({
        name: ""
    })

    // useEffect(()=>{
    //     dispatch(GetGenres()); 
    // }, [dispatch])
    
    const handleGenre = (e) => {
        setGenre({
            [e.target.name]: e.target.value
        })
        // setError(validate({
        //     [e.target.name]: e.target.value 
        // }))   
    };

    const handleBlurGenre = (e) => {
        //validar nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese el nombre del género"
                })
            }else if (!/^[a-zA-Z\s]{2,254}$/.test(e.target.value)){ 
                setError({
                    ...error,
                    [e.target.name]: "Ingrese un nombre válido"
                })
            } else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
    }

    const handeSubmitGenre = async(e) => {
        e.preventDefault();
        if (error.name !== ""){
            return swal({
                title: 'Género no cargado',
                text: "Ingrese un nombre con caracteres válidos",
                icon: 'warning',
                dangerMode:true})
        }
        if(genre.name === ""){
            setError({
                name: genre.name === "" ? "Ingrese el nombre del género" : ""
            });
            return
        } 
        //else {
            const genreCreated = await dispatch(CreateGenre(genre));
            //console.log(genreCreated)
            if(genreCreated.data[0].name){
                dispatch(GetGenres());
                swal({
                    text: "Género añadido a la lista",
                    icon: 'success',
                    })
                setGenre({
                    name: ""
                })
                setActiveGenre(!activeGenre)
            }
            //navigate("/events")
        //}
    };

    return (<div>
            {activeGenre ? <div>
                <div>
                    <input 
                    name="name" 
                    value={genre.name}  
                    onChange={handleGenre}
                    onBlur={handleBlurGenre} 
                    type="text"
                    className={error.name?.length > 0 ? style.error : style.inputGenre} 
                    placeholder={error.name?.length > 0 ? error.name : "Nombrar nuevo género" }
                    />
                </div>
                <button onClick={handeSubmitGenre} className={style.btnGenre}>Añadir género</button>
            </div>:null }
        </div>)
}
