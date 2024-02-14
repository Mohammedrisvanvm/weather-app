import React from "react";
import "./WeatherApp.css";
import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import humidity_icon from "../../assets/humidity.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import { WeatherData } from "../../interface/weatherApi";

const WeatherApp: React.FC = () => {
  const key = `a390c0c93e2b589d787363d24a92cff3`;
  const search = async () => {
    const element = document.getElementsByClassName(
      "cityinput"
    ) as HTMLCollectionOf<HTMLInputElement>;

    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${key}`;

    let response = (await (await fetch(url)).json()) as WeatherData;

    const temperature = document.getElementsByClassName(
      "weather-temp"
    ) as HTMLCollectionOf<HTMLInputElement>;
    const humidity = document.getElementsByClassName(
      "humidity-percentage"
    ) as HTMLCollectionOf<HTMLInputElement>;
    const windspeed = document.getElementsByClassName(
      "wind-speed"
    ) as HTMLCollectionOf<HTMLInputElement>;
    const location = document.getElementsByClassName(
      "weather-location"
    ) as HTMLCollectionOf<HTMLInputElement>;
    temperature[0].innerHTML = response.main.temp;
    humidity[0].innerHTML = response.main.humidity;
    windspeed[0].innerHTML = response.wind.speed;
    location[0].innerHTML = response.name;
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityinput" placeholder="Search" />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="" />
      </div>
      <div className="weather-temp">24°c</div>
      <div className="weather-location">London</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed">18km/h</div>
            <div className="text">Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
