import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from "leaflet";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export default function Leaflet(data) {

    let coord = [];
        //data= '-31.13131 -34.55'

    coord.push(parseFloat(data.data.split(' ')[0]))    
    coord.push(parseFloat(data.data.split(' ')[1]))
    
console.log('Coord', coord)
 

    // center= {[51.505, -0.09]}
  return (
 
        <MapContainer center={coord} zoom={10} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> concerTeck'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coord} >
                <Popup>
                    Evento Concerteck
                </Popup>
            </Marker>
        </MapContainer>
    
    
  )
}
