import React, { useEffect } from "react";
import axios from "axios";
const Currency = () => {
  const APIKEY = "42861af6-8d4e-47a2-b2ba-41df18a388c6";
  // const placeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=newDelhi&key=${APIKEY}`;
  const country_info = `https://v2.api.forex/infos/currency/usd.json?beautify=true&highlat=2&key=${APIKEY}`;

  useEffect(() => {
    axios
      .get(country_info)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  }, [country_info]);

  return (
    <>
      <div></div>
    </>
  );
};

export default Currency;
