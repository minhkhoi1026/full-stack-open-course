import React from 'react'
import phoneBackEnd from '../services/backend'

const Persons = ({persons, setPersons, query}) => {
  // only show filtered persons
  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().startsWith(query.toLowerCase())
  )

  // event handler for click delete button
  const onClickDeleteOf = (name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`)
    if (isConfirmed) {
      const person = persons.find(person => (person.name === name))
      phoneBackEnd.remove(person.id).then(
        () => setPersons(persons.filter(person => person.name !== name))
      )
    }
  }

  return (
  <ul>
    {filteredPersons.map( 
      person => <li key={person.name}>
        {person.name}: {person.number}
        <button 
        value={person.name} 
        onClick={() => onClickDeleteOf(person.name)}>
          delete
        </button>
      </li>
    )}
  </ul>
  )
}

export default Persons