import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


const containerStyle = {
    width: '300px',
    height: '380px'
  };
  
  let center = {
    lat: -34.545306,
    lng: -58.449775
  };

function Map(data) {
    console.log('Data',data.data)
  // let coord = '-34.545306 -58.449775'
   let lati = parseFloat(data.data.split(' ')[0])
   console.log('Latitud',lati)
   let long = parseFloat(data.data.split(' ')[1])
   console.log('Longitud',long)

  center ={lat: lati, lng: long }
  console.log('Centro',center)

   const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCMgNDaVu-lhAOFrwBnQGYmTKJi7xc7QOo"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)