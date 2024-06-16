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
    if (form.city === '') {
      alert('Add values')
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`,
      )
        .then(res => res.json())
        .then(data => data)

      setWeather({data: data})
    }
  }

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'city') {
      setForm({...form, city: value})
    }
    if (name === 'country') {
      setForm({...form, country: value})
    }
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
          onChange={e => handleChange(e)}
        />

        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={e => handleChange(e)}
        />
        <button className="getweather" onClick={e => weatherData(e)}>
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
