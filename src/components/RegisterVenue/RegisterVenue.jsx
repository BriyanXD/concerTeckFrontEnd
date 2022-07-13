
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetVenues, CreateVenue } from '../../redux/actions';
import swal from 'sweetalert';
import style from './RegisterVenue.module.css'



export default function RegisterVenue({handleClickNewVenue}){
    const dispatch = useDispatch();
    const [activeVenue, setActiveVenue] = useState(true)
    const [mapCord, setMapCord] = useState({
        alt: "",
        lat: ""
    });
    const [errorMap, setErrorMap] = useState({
        alt: "",
        lat: ""
    })
    const [venue, setVenue] = useState({
        id: "",
        name: "",
        address: "",
        map: "",
        maxStockGeneral: 0,
        maxStockGeneralLateral: 0,
        maxStockPalco: 0,
        maxStockStreaming: 0,
        maxStockVIP: 0,
        minStock: 0,
        isBigEvent: false
    });
    const [error, setError] = useState({
        name: "",
        address: "",
        //map: "",
        maxStockGeneral: "",
        maxStockGeneralLateral: "",
        maxStockPalco: "",
        maxStockStreaming: "",
        maxStockVIP: "",
    });

    const handleMap = async(e) => {
        if(e.target.name === "alt"){
            await setMapCord({
                ...mapCord,
                alt: e.target.value
            });
            await setVenue({
                ...venue,
                map: mapCord.alt + " " + mapCord.lat
            });
        }
        if(e.target.name === "lat"){
            await setMapCord({
                ...mapCord,
                lat: e.target.value
            });
            await setVenue({
                ...venue,
                map: mapCord.alt + " " + mapCord.lat
            }); 
        }
        //if(mapCord.alt !== "" && mapCord.lat !== ""){
            await setVenue({
                ...venue,
                map: mapCord.alt + " " + mapCord.lat
            });
        //}
    }

    const handleVenue = async(e) =>{
        if(e.target.name === "maxStockGeneral"){
            await setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
                map: mapCord.alt + " " + mapCord.lat,
            });
            return 
        }
        else if(e.target.name === "maxStockGeneralLateral"){
            await setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
                map: mapCord.alt + " " + mapCord.lat,
            });
            return 
        }
        else if(e.target.name === "maxStockPalco"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
                map: mapCord.alt + " " + mapCord.lat,
            });
            return 
        }
        else if(e.target.name === "maxStockStreaming"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
                map: mapCord.alt + " " + mapCord.lat,
            });
            return 
        }
        else if(e.target.name === "maxStockVIP"){
            setVenue({
                ...venue,
                [e.target.name]: Number(e.target.value),
                map: mapCord.alt + " " + mapCord.lat,
            });
            return 
        }
        else if(e.target.name === "name"){
            setVenue({
                ...venue,
                id: e.target.value, // nameIdVenue,
                [e.target.name]: e.target.value,
                map: mapCord.alt + " " + mapCord.lat,
            });
            return 
        }
        setVenue({
            ...venue,
            //minStock: Math.floor((maxStockGeneral + (maxStockGeneralLateral || 0) + (maxStockPalco || 0) + (maxStockStreaming || 0) + (maxStockVIP || 0)) *0.7),
            //isBigEvent: minStock >= 10000 ? true : false,
            map: mapCord.alt + " " + mapCord.lat,
            [e.target.name]: e.target.value
        })
    };


    const handleAddVenue = async(e) =>{
        e.preventDefault();
        let minimunStock = Math.floor((venue.maxStockGeneral + (venue.maxStockGeneralLateral || 0) + (venue.maxStockPalco || 0) + (venue.maxStockStreaming || 0) + (venue.maxStockVIP || 0)) *0.7);
        await setVenue({
            ...venue,
            //map: mapCord.alt + " " + mapCord.lat,
            minStock: minimunStock,
            isBigEvent: minimunStock >= 10000 ? true : false
        });
        if(error.name !== "" || 
        error.address !== "" || 
        //error.map !== "" || 
        error.maxStockGeneral !== "" ||
        error.maxStockGeneralLateral !== "" ||
        error.maxStockPalco !== "" ||
        error.maxStockStreaming !== "" ||
        error.maxStockVIP !== "" ||
        errorMap.alt !== "" ||
        errorMap.lat !== ""){
            return swal({
                title: 'Establecimiento no creado',
                text: "Solucione los errores en los campos obligatorios",
                icon: 'warning',
                dangerMode:true})

        }
        if(venue.name === "" || venue.address === "" || venue.map === "" || venue.maxStockGeneral === 0 || venue.maxStockGeneral === '' || mapCord.alt === "" || mapCord.lat === ""){
            setError({
                name: venue.name === "" ? "Ingrese el nombre el establecimiento" : "",
                address: venue.address === "" ? "Ingrese la dirección del establecimiento" : "",
                //map: venue.map === "" ? "Ingrese las coordenadas de altitud y latitud del establecimiento" : "",
                maxStockGeneral: venue.maxStockGeneral === 0 || venue.maxStockGeneral === '' ? "Ingrese la cantidad máxima general de espectadores" : "",
                maxStockGeneralLateral: "",
                maxStockPalco: "",
                maxStockStreaming: "",
                maxStockVIP: ""
            });
            setErrorMap({
                alt: mapCord.alt === "" ? "Ingrese la coordenada de longitud" : "",
                lat: mapCord.lat === "" ? "Ingrese la coordenada de latitud" : ""
            });
            return
        }

        const venueCreated = await dispatch(CreateVenue(venue));
        console.log("AQUI EL VENUE CREADO: ", venueCreated)
        if(venueCreated.data[0]){
            dispatch(GetVenues());
            swal({
                text: "Establecimiento añadido a la lista",
                icon: 'success',
            })
            setVenue({
                id: "",
                name: "",
                address: "",
                map: "",
                maxStockGeneral: 0,
                maxStockGeneralLateral: 0,
                maxStockPalco: 0,
                maxStockStreaming: 0,
                maxStockVIP: 0,
                minStock: 0,
                isBigEvent: false
            });
            setMapCord({
                alt: "",
                lat: ""
            });
            setActiveVenue(!activeVenue)
        }
        handleClickNewVenue()
    };

    const handleBlurMap = (e) => {
        //validar altiud
        if(e.target.name === "alt"){
            if(e.target.value === ""){
                setErrorMap({
                    ...errorMap,
                    alt: "Ingrese la coordenada de longitud"
                });
            }
            else if(!/^[-,0-9,.]*$/.test(e.target.value)){
                setErrorMap({
                    ...errorMap,
                    alt: "Ingrese una coordenada numérica"
                })
            }
            else {
                setErrorMap({
                    ...errorMap,
                    alt: ""
                })
            }
        }
        //validar latitud
        if(e.target.name === "lat"){
            if(e.target.value === ""){
                setErrorMap({
                    ...errorMap,
                    lat: "Ingrese la coordenada de latitud"
                });
            }
            else if(!/^[-,0-9,.]*$/.test(e.target.value)){
                setErrorMap({
                    ...errorMap,
                    lat: "Ingrese una coordenada numérica"
                })
            }
            else {
                setErrorMap({
                    ...errorMap,
                    lat: ""
                })
            }
        }
    };

    const handleBlurVenue = (e) => {
        //validar nombre
        if(e.target.name === "name"){
            if(e.target.value === ""){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese el nombre del establecimiento"
                })
            } 
            else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar direccion
        if(e.target.name === "address"){
            if(e.target.value === ""){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese la dirección del establecimiento"
                })
            } else if((!/^[a-zA-ZÀ-ÿ\s\d]{1,40}$/.test(e.target.value))){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese la dirección del establecimiento"
                })
            } else{
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }

        //validar stock maximo general
        if(e.target.name === "maxStockGeneral"){
            if(e.target.value === 0){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese la cantidad máxima general de espectadores"
                })
            }
            else if(!/^[0-9]*$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese un valor numérico"
                })
            } 
            else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar stock lateral
        if(e.target.name === "maxStockGeneralLateral"){
            if(!/^[0-9]*$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese un valor numérico"
                })
            } 
            else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar stock palco
        if(e.target.name === "maxStockPalco"){
            if(!/^[0-9]*$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese un valor numérico"
                })
            } 
            else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar stock streaming
        if(e.target.name === "maxStockStreaming"){
            if(!/^[0-9]*$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese un valor numérico"
                })
            } 
            else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
        //validar stock VIP
        if(e.target.name === "maxStockVIP"){
            if(!/^[0-9]*$/.test(e.target.value)){
                setError({
                    ...error,
                    [e.target.name]: "Ingrese un valor numérico"
                })
            } 
            else {
                setError({
                    ...error,
                    [e.target.name]: ""
                })
            }    
        }
    };

    console.log("SETEANDO VENUE: ", venue);
    console.log("SETEANDO MAPA: ", mapCord);
    //console.log("SETEANDO STOCK: ", stock);
    
    return(<div> {activeVenue ? <div>
        <div> 
            <input 
                name="name" 
                value={venue.name}  
                onChange={handleVenue} 
                onBlur={handleBlurVenue} 
                type="text" 
                className={error.name?.length > 0 ? style.error : style.inputText }
                placeholder={error.name?.length > 0 ? error.name : "Nombre del nuevo establecimiento"}
            />
        </div>

        <div> 
            <input 
                name="address" 
                value={venue.address}
                onChange={handleVenue} 
                onBlur={handleBlurVenue} 
                type="text" 
                className={error.address?.length > 0 ? style.error : style.inputText }
                placeholder={error.address?.length > 0 ? error.address : "Dirección del nuevo establecimiento"}
                />
        </div>

        {/* <div> <label>Ubicacion de coordinadas del nuevo establecimiento:* </label> <input name="map" value={venue.map}  onChange={handleVenue} onBlur={handleBlurVenue} type="text" placeholder="Altitud y Latitud del nuevo establecimiento" />{error.map && (<label>{error.map}</label>)} </div> */}
        <div> 
            <input 
                id="map" 
                name="alt" 
                onChange={handleMap} 
                onBlur={handleBlurMap} 
                type="text" 
                className={errorMap.alt?.length > 0 ? style.error : style.inputText }
                placeholder={errorMap.alt?.length > 0 ? errorMap.alt : "Coordenadas de Longitud"}
            />
        </div>

        <div> 
             <input 
                id="map" 
                name="lat" 
                onChange={handleMap} 
                onBlur={handleBlurMap} 
                type="text"
                className={errorMap.lat?.length > 0 ? style.error : style.inputText } 
                placeholder={errorMap.lat?.length > 0 ? errorMap.lat : "Coordenadas de Latitud"} 
             /> 
        </div>

        <div> 
            <div>Máximo stock general</div>
            <input 
                name="maxStockGeneral" 
                value={venue.maxStockGeneral} 
                onChange={handleVenue} 
                onBlur={handleBlurVenue} 
                type="number"
                className={error.maxStockGeneral?.length > 0 ? style.error : style.inputText } 
                placeholder={error.maxStockGeneral?.length > 0 ? error.maxStockGeneral : "Cantidad máxima general"} 
            />
        </div>

        <div>  
        <div>Máximo stock general lateral</div>
            <input 
                name="maxStockGeneralLateral" 
                value={venue.maxStockGeneralLateral}  
                onChange={handleVenue} 
                type="number" 
                className={error.maxStockGeneralLateral?.length > 0 ? style.error : style.inputText }
                placeholder={error.maxStockGeneralLateral?.length > 0 ? error.maxStockGeneralLateral : "Cantidad máxima de laterales"} 
            />
        </div>

        <div> 
            <div>Máximo stock palco</div>
            <input 
                name="maxStockPalco" 
                value={venue.maxStockPalco}  
                onChange={handleVenue} 
                type="number"
                className={error.maxStockPalco?.length > 0 ? style.error : style.inputText }
                placeholder={error.maxStockPalco?.length > 0 ? error.maxStockPalco : "Cantidad máxima de palco"}  
            />
        </div>

        <div> 
        <div>Máximo stock streaming</div>
            <input 
                name="maxStockStreaming" 
                value={venue.maxStockStreaming}  
                onChange={handleVenue} 
                type="number"
                className={error.maxStockStreaming?.length > 0 ? style.error : style.inputText } 
                placeholder={error.maxStockStreaming?.length > 0 ? error.maxStockStreaming : "Cantidad máxima de streaming"}
            />
        </div>

        <div>
            <div>Máximo stock VIP</div>
            <input 
                name="maxStockVIP" 
                value={venue.maxStockVIP}  
                onChange={handleVenue} 
                type="number"
                className={error.maxStockVIP?.length > 0 ? style.error : style.inputText }
                placeholder={error.maxStockVIP?.length > 0 ? error.maxStockVIP : "Cantidad máxima de VIP"} 
            />
        </div>


        <button onClick={handleAddVenue} className={style.btnLocation}>Añadir establecimiento</button>

    </div>:null} </div>)
}
