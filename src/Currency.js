import React, { useEffect, useState } from "react";
import "./Currency.css";
import axios from "axios";

const Currency = ({ name }) => {
  const [value, setValue] = useState();
  const APIKEY = "127bd1eca15de13ce2be0cd21eec92a4";
  const country_info = `http://api.exchangeratesapi.io/v1/latest?access_key=${APIKEY}`;
  useEffect(() => {
    axios
      .get(country_info)
      .then((res) => {
        const rate = res.data.rates[name];
        setValue(rate);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [country_info, name]);

  return (
    <>
      <div className="currency">
        <table>
          <th className-="header">
            <td>Currency</td>
          </th>
          <th className-="header">
            <td>Price</td>
          </th>
          <tr>
            <td>EUR{name}</td>
            <td>{value}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Currency;
