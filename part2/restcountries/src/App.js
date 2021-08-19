import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <ul>
        <li>Capital name: {country.capital}</li>
        <li>Population: {country.population} people</li>
      </ul>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(
          language => (<li key={language.iso639_2}>{language.name}</li>)
        )}
      </ul>
      <img 
      src={country.flag}
      alt={`${country.name} flag`}
      width="150px"
      />
    </div>
  )
}

const CountriesDisplay = ({countries}) => {
  // if more than 10 countries founded then return this
  if (countries.length > 10)
    return (
      <p>Too many matches, specify your country</p>
    )
  // if there only exactly 1 country founded then return this
  if (countries.length === 1) {
    return (
      <Country country={countries[0]}/>
    )
  }
    
  // other wise return this
  return (
    <ul>
      {countries.map(
        (country) => (<li key={country.name}>{country.name}</li>)
      )}
    </ul>
  )
}

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  //fetch data from RESTcountries server
  const data_hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => setCountries(response.data) )
  }
  useEffect(data_hook, [])
  const filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(query.toLowerCase())
    )

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
  <div>
    <p>
      Find countries <input value={query} onChange={handleQueryChange}/>
    </p>
    <CountriesDisplay countries={filteredCountries}/>
  </div>
  );
}

export default App;
