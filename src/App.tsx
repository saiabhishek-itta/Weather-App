import React,{useState} from 'react';
import LocationData from './LocationData';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import DisplayWeatherData,{LocationObject} from './DisplayWeatherData';
import DailyForecast from './DailyForecast';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, Link, useNavigate } from "react-router-dom";


function App() {
  const [locationData, setLocationData] = useState({} as LocationObject);
  return (
    <div className="App">
      
        <LocationData setLocationData = {setLocationData}></LocationData>
        
       {/* <DisplayWeatherData locationData = {locationData}></DisplayWeatherData>
        
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DailyForecast locationData={locationData}></DailyForecast> } />
          </Routes>
        </BrowserRouter>
        */}
    </div>
  );
}

export default App;
