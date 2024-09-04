import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import {Link} from 'react-router-dom';

export interface LocationObject {
  lat: number;
  lon: number;
  cityName: string;
  state: string;
  country: string;
}

export interface WeatherFeilds {
  main:{
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  timezone: number;
  dt: number;
  sunrise: number;
  sunset: number;
}

export interface ApiResponse {
  city: {
    id: number;
  };
  list: WeatherFeilds[];
}


function DailyForecast({ locationData }: { locationData: LocationObject }) {
  const [dailyForecastData, setDailyForecastData] = useState(
    {} as Record<string, WeatherFeilds[]>
  );
  const [showAll, setShowAll] = useState({} as Record<string, boolean>);

  useEffect(() => {
    if (locationData.lat === undefined || locationData.lon === undefined) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData.lat}&lon=${locationData.lon}&cnt=45&appid=ed039290380d4519ad11988c00a055c7`
    )
      .then((response) => response.json())
      .then((weatherData: ApiResponse) => {
        const groupedData = weatherData.list.reduce((acc, current) => {
          const date = new Date(current.dt * 1000).toLocaleDateString();
          acc[date] = acc[date] || [];
          acc[date].push(current);
          return acc;
        }, {} as Record<string, WeatherFeilds[]>);

        const initialShowAllState = Object.keys(groupedData).reduce((acc, date) => {
          acc[date] = false;
          return acc;
        }, {} as Record<string, boolean>);

        setDailyForecastData(groupedData);
        setShowAll(initialShowAllState);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [locationData]);

  const handleButtonClick = (date: string) => {
    setShowAll((prevShowAll) => ({
      ...prevShowAll,
      [date]: !prevShowAll[date],
    }));
  };

  return (
    <>
      {Object.keys(dailyForecastData).length === 0 ? (
        <div>
          <h1></h1>
        </div>
      ) : (
        <div className="container py-3 h-100">
          <h1>Daily Forecast</h1>
          <div className="row justify-content-center align-items-center h-100 mt-5">
            
            {Object.keys(dailyForecastData).map((date) => (
              <div key={date}>
                <h4>{date}</h4>
                {showAll[date]
                  ? dailyForecastData[date].map((data) => (
                      <div className="col-md-10 col-lg-8 col-xl-6 m-10" key={data.dt}>

                          <div className="border border-dark p-2 d-flex justify-content-between align-items-center text-dark">
                            <span>{new Date(data.dt * 1000).toLocaleTimeString()}</span>
                            <span>
                              <img
                                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                                alt={data.weather[0].description}
                              />
                              {("0" + Math.round(data.main.temp_min - 273.15)).slice(-2)}
                              °C/
                              {("0" + Math.round(data.main.temp_max - 273.15)).slice(-2)}
                              °C
                            </span>
                            <span>{data.weather[0].main} - {data.weather[0].description}</span>
                          </div>
                      </div>
                    ))
                  : // Display only the first record
                    dailyForecastData[date].length > 0 && (
                      <div className="col-md-10 col-lg-10 col-xl-12" key={date}>

                          <div className="border border-dark p-2 d-flex justify-content-between align-items-center text-dark">
                            <span>
                              {new Date(dailyForecastData[date][0].dt * 1000).toLocaleTimeString()}
                            </span>
                            <span>
                              <img
                                src={`http://openweathermap.org/img/wn/${
                                  dailyForecastData[date][0].weather[0].icon
                                }.png`}
                                alt={dailyForecastData[date][0].weather[0].description}
                              />
                              {(
                                "0" +
                                Math.round(dailyForecastData[date][0].main.temp_min - 273.15)
                              ).slice(-2)}
                              °C/
                              {(
                                "0" +
                                Math.round(dailyForecastData[date][0].main.temp_max - 273.15)
                              ).slice(-2)}
                              °C
                            </span>
                            <span>
                              {dailyForecastData[date][0].weather[0].main} -{" "}
                              {dailyForecastData[date][0].weather[0].description}
                            </span>
                          </div>
           
                      </div>
                    )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default DailyForecast;

