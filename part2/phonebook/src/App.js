import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import phoneBackEnd from './services/backend'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showName, setShowName] = useState('')
  const [ notifMessage, setNotifMessage] = useState(null)

  // fetch data from server
  const data_hook = () => {
    phoneBackEnd
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons)
    })
  }
  useEffect(data_hook, [])

  // function to pop up message
  const popupMessage = (message) => {
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000);
  }

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

  // event handler for click delete button
  const onClickDeleteOf = (name) => {
    const isConfirmed = window.confirm(`Delete ${name}?`)
    if (isConfirmed) {
      const person = persons.find(person => (person.name === name))
      phoneBackEnd.remove(person.id)
      .then(
        () => {
          setPersons(persons.filter(person => person.name !== name))
          popupMessage(`[SUCCESS] Deleted information of ${name}`)
        }
      )
      .catch(
        () => {
          popupMessage(`[ERROR] Information of ${name} has already been removed from server`)
          setPersons(persons.filter(person => person.name !== name))
        }
      )
    }
  }

  // function add new name into @persons list
  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    const updateInfo = () => {
      setNewName('')
      setNewNumber('')
    }

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
            person => (person.id === id ? receivedPerson : person))
          )
          updateInfo()
          popupMessage(`[SUCCESS] Changed number of ${receivedPerson.name}`)
        })
      }
    }
    else {
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
        updateInfo()
        popupMessage(`[SUCCESS] Added number of ${receivedPerson.name}`)
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage}/>

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
      <Persons 
      persons={persons} 
      onClickDeleteOf={onClickDeleteOf}
      query={showName}
      />
    </div>
  )
}

export default App