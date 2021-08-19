import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [curWeather, setCurWeather] = useState({})
    const data_hook = () => {
        const api_key = process.env.REACT_APP_API_KEY
        const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
        axios.get(url).then(
            response => setCurWeather(response.data.current)
        )
    }
    useEffect(data_hook, [capital])
    return (
    <div>
        <h3>Weather in {capital}</h3>
        <img src={curWeather.weather_icons} alt="weather icon" width="80px"/>
        <p><b>Overview</b>: {curWeather.weather_descriptions}</p>
        <p><b>Temperature</b>: {curWeather.temperature} Celcius</p>
        <p><b>Wind speed</b>: {curWeather.wind_speed}mph direction {curWeather.wind_dir}</p>
        <p><b>Humidity</b>: {curWeather.humidity} absolute</p>
    </div>
    )
}

export default Weather