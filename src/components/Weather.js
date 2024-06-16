import React, {useState} from 'react'
import DisplayWeather from './DisplayWeather'
import './Weather.css'

function Weather() {
  const [weather, setWeather] = useState([])
  const [form, setForm] = useState({
    city: '',
    country: '',
  })
  const [isDarkMode, setIsDarkMode] = useState(false)

  const APIKEY = '014f10348f6fd54cd59ecadeb6f529fb'

  async function weatherData(e) {
    e.preventDefault()
    const {city, country} = form

    if (city === '') {
      alert('Add values')
    } else {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${APIKEY}`,
      )
      const data = await response.json()

      setWeather({data})
    }
  }

  const handleChange = ({target: {name, value}}) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={isDarkMode ? 'weather dark-mode' : 'weather light-mode'}>
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleChange}
        />
        <button className="getweather" onClick={weatherData}>
          Submit
        </button>
      </form>
      <button className="toggle-mode" onClick={toggleDarkMode}>
        {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} isDarkMode={isDarkMode} />
        </div>
      ) : (
        <p className="Err-msg">Please Enter valid input</p>
      )}
    </div>
  )
}

export default Weather
