import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export interface LocationObject {
  lat: number;
  lon: number;
  cityName: string;
  state: string;
  country: string;
}

export interface WeatherFeilds {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
    desc: string;
  };
  timezone: number;
  dt: number;
}
function DisplayWeatherData({
  locationData,
}: {
  locationData: LocationObject;
}) {
  const [weatherData, setWeatherData] = useState({} as WeatherFeilds);
  useEffect(() => {
    if (locationData.lat === undefined || locationData.lon === undefined)
      return;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationData.lat}&lon=${locationData.lon}&appid=ed039290380d4519ad11988c00a055c7`
    )
      .then((response) => {
        return response.json();
      })
      .then((weatherData1: WeatherFeilds) => {
        weatherData1.weather[0].icon = `http://openweathermap.org/img/wn/${weatherData1.weather[0].icon}@2x.png`;
        let windSpeed = weatherData1.wind.speed * 3.6;
        let desc = " ";
        if (windSpeed == 0)
          desc = `Calm and still - ${Math.round(windSpeed)} km/h`;
        else if (windSpeed < 5)
          desc = `Light winds - ${Math.round(windSpeed)} km/h`;
        else if (windSpeed < 11)
          desc = `Light breeze - ${Math.round(windSpeed)} km/h`;
        else if (windSpeed < 19)
          desc = `Gentle breeze - ${Math.round(windSpeed)} km/h`;
        else if (windSpeed < 28)
          desc = `Fresh breeze - ${Math.round(windSpeed)} km/h`;
        else if (windSpeed < 49)
          desc = `Strong breeze - ${Math.round(windSpeed)} km/h`;
        else if (windSpeed < 61)
          desc = `Moderate gale - ${Math.round(windSpeed)} km/h`;
        weatherData1.wind.desc = desc;
        setWeatherData(weatherData1);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [locationData]);
  return (
    <>
      {weatherData.main === undefined ? (
      <div></div>
      ) : (
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
          <h1>Current Weather</h1>
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card p-2">
                <h4 className="mb-0">
                  {locationData.cityName},{locationData.state},
                  {locationData.country}
                </h4>
                <h5 className="text-center p-2">
                  {new Date(weatherData.dt * 1000).toLocaleString()}
                </h5>
                <p className="display-2 my-3 text-center">
                  <img src={weatherData.weather[0].icon} />
                  {Math.round(weatherData.main.temp - 273.15)}°C
                </p>
                <p className="mb-2">
                  Feels Like:{" "}
                  <strong>
                    {Math.round(weatherData.main.feels_like - 273.15)} °C
                  </strong>
                </p>
                <h5>
                  {weatherData.weather[0].main} -{" "}
                  {weatherData.weather[0].description}
                </h5>
                <h5>{weatherData.wind.desc}</h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DisplayWeatherData;
