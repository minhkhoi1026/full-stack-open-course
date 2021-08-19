import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({showName, handleShowChange}) => {
  return (
  <p>
    Filter shown with <input value={showName} onChange={handleShowChange}/>
  </p>
  )
}

const PersonForm = ({onSubmit, newName, onChangeName, newNumber, onChangeNumber}) => {
  return (
  <form onSubmit={onSubmit}>
    <div>
      Name: <input value={newName} onChange={onChangeName}/>
    </div>
    <div>
      Number: <input value={newNumber} onChange={onChangeNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons}) => {
  return (
  <ul>
    {persons.map( 
      person => <li key={person.name}>
        {person.name}: {person.number}
      </li>
    )}
  </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName] = useState('')
  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().startsWith(showName.toLowerCase())
  )

  // fetch data from server
  const data_hook = () => {
    axios.get('http://localhost:3001/persons')
      .then(
        (response) => {
          setPersons(response.data)
          console.log("Fetched", response)
        }
      )
  }
  useEffect(data_hook, [])


  // function to handle change on input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleShowChange = (event) => {
    setShowName(event.target.value)
  }
  // function add new name into @persons list
  const addPerson = (event) => {
    event.preventDefault()
    // if person name already in then alert user
    if (persons.findIndex(person => person.name === newName) !== -1) {
      window.alert(`${newName} is already added to phonebook!`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
      showName={showName}
      handleShowChange={handleShowChange}
      />

      <h3>Add new person</h3>
      <PersonForm 
      onSubmit={addPerson} 
      newName={newName} onChangeName={handleNameChange}
      newNumber={newNumber} onChangeNumber={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App