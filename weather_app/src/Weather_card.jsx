import React, { useEffect, useState, useContext } from 'react'
import { BgContext } from "./context/BgContext"

import { BiSearchAlt } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";

import clear_icon from '../src/assets/icons/Assets/clear.png'
import cloud_icon from '../src/assets/icons/Assets/cloud.png'
import drizzle_icon from '../src/assets/icons/Assets/drizzle.png'
import rain_icon from '../src/assets/icons/Assets/rain.png'
import snow_icon from '../src/assets/icons/Assets/snow.png'

function Weather_card() {

  const { setWeather } = useContext(BgContext);

  const [location, setLocation] = useState("");

  const [weatherData, setWeatherData] = useState({})

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const handleOutput = async (Location) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
      const res = await fetch(url);

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon


      setWeatherData({
        city_name: data.name || "--",
        temp: Math.floor(data.main.temp) || "--" ,
        temp_high: Math.floor(data.main.temp_max) || "--",
        temp_low: Math.floor(data.main.temp_min) || "--",
        humidity: data.main.humidity || "--",
        wind: data.wind.speed || "--",
        icon: icon || "--",
        weather_nature: data.weather[0].description || "--",
      });


      setWeather(data.weather[0].icon);


    } catch (error) {
      console.log(error)
    }
  }

  


  return (
    <div className='flex flex-col lg:flex-row md:flex-row lg:gap-12 md:gap-8 bg-white/50 p-7 rounded-md gap-5 items-center justify-center'>
      <div className="search flex gap-2 ">
        <input type='text'
          className='bg-white/90 border-gray-400 outline-none rounded-2xl p-1.5 text-gray-900 '
          placeholder='Enter Location'
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className='bg-white/90 border-gray-400 items-center rounded-full p-1.5  hover:scale-95' onClick={(e) => handleOutput(location)}>
          <BiSearchAlt className='text-gray-700 text-2xl' />
        </button>
      </div>

      <div className="main_section flex flex-col justify-between w-80 border-t-2 lg:border-t-0 lg:border-l-2 md:border-t-0 md:border-l-2">
        <div className='flex flex-col items-center justify-center lg:ml-4 md:ml-4'>
          <h2 className='text-white font-medium '>{weatherData.city_name || "--"}</h2>
          <img src={weatherData.icon} alt="" className='h-20' />
          <h1 className='text-white font-bold'>{weatherData.temp || "--"}°C</h1>
          <h3 className='text-gray-300 text-base mb-2.5'>{weatherData.weather_nature || "--"}</h3>

          <div className='flex gap-5'>
            <h3 className='text-gray-200'>H: {weatherData.temp_high || "--"}°</h3>
            <h3 className='text-gray-200'>L: {weatherData.temp_low || "--"}°</h3>
          </div>
        </div>

        <div className='flex justify-between w-full  mt-8 lg:ml-4 md:ml-4'>
          <div>
            <h3 className='flex  items-center gap-1 text-gray-200'><MdWaterDrop />
              {weatherData.humidity || "--"} </h3>
            <p className='text-gray-300 text-sm'>Humidity</p>
          </div>
          <div >
            <h3 className='flex  items-center gap-1 text-gray-200'><FaWind />
              {weatherData.wind || "--"} km/hr </h3>
            <p className='text-gray-300 text-sm'>speed</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Weather_card