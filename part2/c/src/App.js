
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
  const [weatherData, setWeatherData] = useState({})
  const renderWeatherData = () => {
    if (Object.keys(weatherData).length === 0) return ''
    else {
      return (
        <>
          <h2>Weather in {capital}</h2>
          <p>Temperature: {weatherData.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}/>
          <p>Wind: {(weatherData.wind.speed * 2.23694).toFixed(1)} mph direction {weatherData.wind.deg}</p>
        </>
      )
    }
  }

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        console.log(response.data); 
        setWeatherData(response.data);
      })
  }, [])

  return (
    <div>
      {renderWeatherData()}
    </div>
  )
}

const Country = ({country}) => {
  return (
    <>
      <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
      <h3>Spoken Languages:</h3>
      <ul>
        {Object.keys(country.languages).map((language, i) => 
          <li key={i}>{country.languages[language]}</li>,
        0)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
      <Weather capital={country.capital}/>
    </>
  )
}
const CountryList = ({countries, showCountryHandler}) => {
  return (
    <ul>
      {countries.map(
        (country, i) => {
            return (
            <li key={i}>{country.name.common}
              <button onClick={() => showCountryHandler([country])}>show</button>
            </li>
            )
        }, 0)}
    </ul>
  )
}
const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const renderSearchResults = () => {
    if (searchResults.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>        
      )
    }
    else if (searchResults.length === 1) {
      return (<Country country={searchResults[0]}/>)
    }
    else {
      return (
        <CountryList countries={searchResults} showCountryHandler={setSearchResults}/>
      )
    }
  }
  useEffect(() => {
    axios
    .get(`https://restcountries.com/v3.1/name/${newSearch.toLowerCase()}`)
    .then(response => {
      console.log(response.data);
      setSearchResults(response.data)
    })
  }, [newSearch])
  
  return (
    <div>
        <div>
            Find Countries: <input value={newSearch} onChange={handleSearchChange}/>
        </div>
        <div>{renderSearchResults()}</div>
    </div>
  )
}

export default App
