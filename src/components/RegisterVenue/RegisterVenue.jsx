
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetVenues, CreateVenue } from '../../redux/actions';

function validate(venue){
    const error = {}
    if(!venue.name){
        error.name = "Ingrese el nombre el establecimiento"
    }
    if(!/^[a-z0-9-]{3,16}$/.test(venue.name)){
        error.name = "Ingrese un nombre con caracteres validos"
    }
    
}


export default function RegisterVenue(){
    const dispatch = useDispatch();
    const [activeVenue, setActiveVenue] = useState(true)
    const [error, setError] = useState({});
    const [venue, setVenue] = useState({
        name: "",
        address: "",
        map: "",
        maxStockGeneral: 0,
        maxStockGeneralLateral: 0,
        maxStockPalco: 0,
        maxStockStreaming: 0,
        maxStockVIP: 0,
        minStock: 0
    })
}
