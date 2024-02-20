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
const key = import.meta.env.VITE_KEY;

const WeatherApp: React.FC = () => {
  const [wicon, setWicons] = React.useState<string>(cloud_icon);
  const search = async () => {
    try {
      
   
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
    temperature[0].innerHTML = Math.floor(Number(response.main.temp)) + "°c";
    humidity[0].innerHTML = response.main.humidity + "%";
    windspeed[0].innerHTML = Math.floor(Number(response.wind.speed)) + "km/h";
    location[0].innerHTML = response.name;

    if (
      response.weather[0].icon === "01d" ||
      response.weather[0].icon === "01n"
    ) {
      setWicons(clear_icon);
    } else if (
      response.weather[0].icon === "02d" ||
      response.weather[0].icon === "02n"
    ) {
      setWicons(cloud_icon);
    } else if (
      response.weather[0].icon === "03d" ||
      response.weather[0].icon === "03n"
    ) {
      setWicons(drizzle_icon);
    } else if (
      response.weather[0].icon === "04d" ||
      response.weather[0].icon === "04n"
    ) {
      setWicons(drizzle_icon);
    } else if (
      response.weather[0].icon === "09d" ||
      response.weather[0].icon === "09n"
    ) {
      setWicons(rain_icon);
    } else if (
      response.weather[0].icon === "10d" ||
      response.weather[0].icon === "10n"
    ) {
      setWicons(rain_icon);
    } else if (
      response.weather[0].icon === "13d" ||
      response.weather[0].icon === "13n"
    ) {
      setWicons(snow_icon);
    } else {
      setWicons(clear_icon);
    }
  } catch (error) {
    console.log(error);
      
  }
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
        <img src={wicon} alt="" />
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
