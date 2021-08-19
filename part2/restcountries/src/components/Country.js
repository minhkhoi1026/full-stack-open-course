import React from 'react'

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

export default Country