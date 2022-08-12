import { render } from "@testing-library/react";
import React, { useState } from "react";
import { TiWeatherSunny, TiWeatherShower, TiWeatherCloudy, TiWeatherPartlySunny, TiWeatherSnow, TiWeatherStormy } from "react-icons/ti"
import { TbMist } from "react-icons/tb"
import { Card } from "./assets/components/Card";
import { Forecast } from "./assets/components/Forecast";

const api = {
  key: "195b51352dd3e828f3473c7710151439",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});

  const search = evt => {
    if (evt.key == "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');  // so that we empty the search bar
          setWeather(result)
          console.log(weather)
        });

      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          // console.log("forecast = " + result.list[0].dt)
          var date = new Date(result.list[0].dt * 1000);
          // console.log(date.toUTCString())
          setForecast(result)
          // console.log("forecastApp = " + forecast.list[0].dt)
        })
    }
  }

  const datebuilder = (date) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let year = date.getFullYear()

    return `${days[date.getDay()]} ${date.getDate()}, ${months[date.getMonth()]} ${year}`
  }

  const renderIcon = (weatherDesc) => {
    if (weatherDesc.includes("partly") && (weatherDesc.includes("cloud") || weatherDesc.includes("sun"))) {
      return (<TiWeatherPartlySunny fontSize={40}></TiWeatherPartlySunny>)
    } else if (weatherDesc.includes("sun") || (weatherDesc.includes("clear"))) {
      return (<TiWeatherSunny fontSize={40}></TiWeatherSunny>)
    } else if (weatherDesc.includes("cloud")) {
      return (<TiWeatherCloudy fontSize={40}></TiWeatherCloudy>)
    } else if (weatherDesc.includes("storm")) {
      return (<TiWeatherStormy fontSize={40}></TiWeatherStormy>)
    } else if (weatherDesc.includes("snow")) {
      return (<TiWeatherSnow fontSize={40}></TiWeatherSnow>)
    } else if (weatherDesc.includes("rain") || weatherDesc.includes("showers")) {
      return (<TiWeatherShower fontSize={40}></TiWeatherShower>)
    } else if (weatherDesc.includes("mist")) {
      return (<TbMist fontSize={40}></TbMist>)
    } else {
      return (<></>)
    }
  }


  return (
    <div className={(typeof weather.main != "undefined" ? (weather.main.temp > 15 ? "App warm" : "App") : "App")}>
      <main>
        <div className="searchBox">
          <input placeholder="search" className="searchBar"
            onChange={val => setQuery(val.target.value)}
            value={query}
            onKeyPress={search}></input>
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="locationBox">
              <div className="location">{weather?.name}, {weather?.sys.country}</div>
              <div className="date">{datebuilder(new Date())}</div>
            </div>
            <div className="weatherBox">
              <div className="weather">{weather?.weather[0].description}</div>
              <div className="icon">{renderIcon(weather.weather[0].description)}</div>
              <div className="temperature">{Math.floor(weather?.main.temp)}°C</div>
            </div>
          </div>
        ) : ('')}
        <div className="cards">
          {forecast.list != "undefined" && (<Forecast forecast={forecast.list}></Forecast>)}
        </div>
      </main>
    </div>
  );
}

export default App;
