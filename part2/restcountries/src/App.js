import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountriesDisplay from './components/CountriesDisplay.js'

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  //fetch data from RESTcountries server
  const data_hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => setCountries(response.data) )
  }
  useEffect(data_hook, [])
  const filter_hook = () => {
    const new_countries = countries.filter(
      country => country.name.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredCountries(new_countries)
  }
  useEffect(filter_hook, [query, countries])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  return (
  <div>
    <p>
      Find countries <input value={query} onChange={handleQueryChange}/>
    </p>
    <CountriesDisplay 
    countries={filteredCountries}
    setCountries={setFilteredCountries}
    />
  </div>
  );
}

export default App;
