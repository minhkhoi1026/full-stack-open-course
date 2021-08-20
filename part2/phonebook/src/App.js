import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import phoneBackEnd from './services/backend'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName] = useState('')

  // fetch data from server
  const data_hook = () => {
    phoneBackEnd
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons)
    })
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
    const person = persons.find(person => person.name === newName)

    // if person name already in then alert user, if they want change number to a new one
    if (person !== undefined) {
      const isConfirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with the new one`)
      if (isConfirmed) {
        const id = person.id
        const newPerson = {...person, number: newNumber}

        phoneBackEnd
        .update(id, newPerson)
        .then(receivedPerson => {
          setPersons(persons.map(
            person => (person.id === id ? newPerson : person))
          )
          setNewName('')
          setNewNumber('')
        })
      }
      return
    }

    // otherwise create a person and add his/her to persons list
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    phoneBackEnd
      .create(newPerson)
      .then( 
        (receivedPerson) => {
          setPersons(persons.concat(receivedPerson))
          setNewName('')
          setNewNumber('')
      } )
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
      <Persons persons={persons} setPersons={setPersons} query={showName}/>
    </div>
  )
}

export default App