import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('new name here')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  // add new name into @persons list
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    console.log(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map( 
          person => <li>{person.name}</li>
        )}
      </ul>
    </div>
  )
}

export default App