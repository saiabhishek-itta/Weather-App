import React, { useState } from "react";

function LocationData({setLocationData}:{setLocationData:Function}) {
  const [city, setCity] = useState("");
  const fetchWeatherData = async() => {
    const geoApiResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=ed039290380d4519ad11988c00a055c7`);
    const geoLocationData = await geoApiResponse.json();
    console.log(geoLocationData.length)
    if(geoLocationData.length !== 1){
        return;
    }
    let lat = geoLocationData[0].lat;
    let lon = geoLocationData[0].lon;
    let cityName = geoLocationData[0].name;
    let state = geoLocationData[0].state;
    let country = geoLocationData[0].country;
    setLocationData({
      lat,lon,cityName,state,country 
    })
  }
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-sm-6 p-2 p-sm-0">
            <input
              className="form-control"
              type="search"
              placeholder="Enter city*"
              aria-label="Search"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div className="col-sm-2 col-5" onClick={fetchWeatherData}>
            <button className="btn btn-primary">Search </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationData;
