import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import "./Maps.css";
import Currency from "./Currency";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
var crg = require("country-reverse-geocoding").country_reverse_geocoding();
var cc = require("currency-codes");
const Maps = () => {
  const [name, setName] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);
  useEffect(() => {
    if (Object.keys(currentPosition).length) {
      var country = crg.get_country(currentPosition.lat, currentPosition.lng);

      setName(cc.country(country.name)[0].code);
    }
  }, [currentPosition]);
  const mapStyles = {
    marginTop: "2rem",
    height: "50vh",
    width: "100%",
    borderRadius: "1rem",
  };
  console.log(name);
  return (
    <>
      <div className="details-app">
        <LoadScript googleMapsApiKey="AIzaSyDSjEjkbGBrbvEaa1RakqVKJ9uEWUDU2P0">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={currentPosition}
          >
            <Marker position={currentPosition} />;
          </GoogleMap>
        </LoadScript>

        <div className="weather-js">
          <Weather currentWeather={currentPosition} />
        </div>
      </div>

      <Currency name={name} />
    </>
  );
};
export default Maps;
