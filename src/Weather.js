import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = ({ currentWeather }) => {
  const [weath, setWeath] = useState("");
  const [date, setDate] = useState();
  const [forecast, setForecast] = useState([]);
  const API_KEY = "2bb337a52dd5533fa46e136c135cb9e7";
  const [icon, setIcon] = useState();
  const current_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeather.lat}&lon=${currentWeather.lng}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`;

  const handleClick = () => {
    document.querySelector(".forecastClass").classList.toggle("forecast");
  };

  useEffect(() => {
    axios
      .get(current_url)
      .then((res) => {
        setDate(res.data.current.dt);
        setWeath(res.data.current.temp);
        setIcon(res.data.current.weather[0].icon);

        let i = 1;
        let tempArray = [];
        for (i; i <= 3; i++) {
          tempArray.push({
            icon: res.data.daily[i].weather[0].icon,
            temp: res.data.daily[i].temp.min,
            dt: res.data.daily[i].dt,
          });
        }
        setForecast(tempArray);
      })
      .catch((err) => {
        console.log("Wrong co-ordinates");
      });
  }, [current_url]);

  return (
    <>
      <h1>{new Date(date * 1000).toDateString("en")}</h1>
      <div className="details">
        <h3>temperature is:</h3>
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="ic"
        />
        <p className="temperature">
          {weath}
          {"\u00b0"}C
        </p>
      </div>
      <button className="button" onClick={handleClick}>
        Next 3 days forecast
      </button>
      <div className="forecastClass forecast">
        {forecast.map((perIcon, id) => {
          return (
            <ul key={id}>
              <p>{new Date(perIcon.dt * 1000).toDateString("en")}</p>
              <img
                src={`http://openweathermap.org/img/wn/${perIcon.icon}@2x.png`}
                alt="icon"
              />
              <li>
                {perIcon.temp}
                {"\u00b0"}C
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default Weather;
