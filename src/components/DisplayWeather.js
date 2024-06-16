import React from 'react'
import './DisplayWeather.css'

function DisplayWeather(props) {
  const {data, isDarkMode} = props

  return (
    <div
      className={
        isDarkMode ? 'displayweather dark-mode' : 'displayweather light-mode'
      }
    >
      {data.cod !== 404 ? (
        <>
          <div className="maincard">
            <span className="cardtitle">
              {data.name} , {data.sys.country}. Weather
            </span>
            <span className="cardsubtitle">
              As of {new Date().toLocaleTimeString()}
            </span>

            <h1 className="temparature">
              {' '}
              {Math.floor(data.main.temp - 273.15)}
              <sup>o</sup>
            </h1>
          </div>
        </>
      ) : (
        <div className="maincard">
          <h2>{data.message}</h2>
        </div>
      )}
    </div>
  )
}

export default DisplayWeather
