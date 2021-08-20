import React from 'react'

const Persons = ({persons, query, onClickDeleteOf}) => {
  // only show filtered persons
  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().startsWith(query.toLowerCase())
  )

  return (
  <ul>
    {filteredPersons.map( 
      person => <li key={person.id}>
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