
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateGenre, GetGenres } from '../../redux/actions';
//import { Link, useNavigate } from "react-router-dom";

function validate(genre){
    const error = {};
    if(!genre.name){
        error.name = 'Campo obligatorio'
    }
    if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(genre.name)){
        error.name = "Ingrese un nombre con caracteres validos"
    }
    return error
}

export default function RegisterGenre(){
    const dispatch = useDispatch();
    //const navigate = useNavigate();
    // const genres = useSelector((state)=> state.Genres);
    const [activeGenre, setActiveGenre] = useState(true)
    const [error, setError] = useState({});
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
        setError(validate({
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

    return (<div>
            {activeGenre ? <div>
                <div> <input name="name" value={genre.name}  onChange={handleGenre} type="text" placeholder="Nombrar nuevo genero" />{error.name && (<label>{error.name}</label>)} </div>
                <button onClick={handeSubmitGenre}>Añadir</button>
            </div>:null }
        </div>)
}
{/* <form onSubmit={handeSubmitGenre}>
        <div> <input name="name" value={genre.name}  onChange={handleGenre} type="text" placeholder="Nombrar nuevo genero" />{error.name && (<label>{error.name}</label>)} </div>
        <button type="submit">Añadir</button>
</form> */}