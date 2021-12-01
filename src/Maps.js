import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import "./Maps.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Maps = () => {
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
  const mapStyles = {
    marginTop: "2rem",
    height: "50vh",
    width: "50%",
    borderRadius: "1rem",
  };

  return (
    <>
      <div className="details-app">
        <LoadScript>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={currentPosition}
          >
            <Marker position={currentPosition} />;
          </GoogleMap>
        </LoadScript>
        <div className="weather-js">
          <Weather currentWeather={currentPosition} />
        </div>
      </div>
    </>
  );
};

export default Maps;
