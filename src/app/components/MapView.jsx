"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { parse } from "postcss";

const APIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

/*Code copy from https://www.npmjs.com/package/@react-google-maps/api
Line 11 - 43
*/
const containerStyle = {
  marginTop: '20px',
  width: '90vw',
  height: '85vh'
};

const center = {
  lat: 44.64533 ,
  lng: -63.57239
};

//Load map view
const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: APIKey,
  });

  //Places to show on the map
  const [map, setMap] = React.useState(null)

  //Load map view
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  //Mount map in DOM
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  //Fetch API endpoint

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_ENDPOINT)
      .then(response => response.json())
      .then(data => setPlaces(data))
      .catch(error => console.error(error));
  }, []);


  //Return map view
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >

        {places.map((place) => (
          <MarkerF
            key={place.id}
            position={{ lat: parseFloat(place.location.latitude), lng: parseFloat(place.location.longitude) }}

            //onClick function still in development
            onClick={() => {
              setSelected(place);
            }}
          />
        ))}  
        
      </GoogleMap>
    </>
  ) : <></>
}

export default MapView
