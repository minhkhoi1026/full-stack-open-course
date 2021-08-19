import React from 'react'
import Country from './Country'

const CountriesDisplay = ({countries, setCountries}) => {
  // if more than 10 countries founded then return this
  if (countries.length > 10)
    return (
      <p>Too many matches, specify your country</p>
    )
  // if there only exactly 1 country founded then show this country
  if (countries.length === 1)
    return <Country country={countries[0]}/>

  
  // otherwise return this
  const showCountry = (event) => {
    const name = event.target.value;
    const country = countries.find(country => country.name === name)
    setCountries([country])
  }
  return (
    <ul>
      {countries.map(
        (country) => (
        <li key={country.name}>
          {country.name} <button value={country.name} onClick={showCountry}>show</button>
        </li>
        )
      )}
    </ul>
  )
}

export default CountriesDisplay