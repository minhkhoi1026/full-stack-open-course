import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // fetch data from server
  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])
  
  // configure for showing note
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  // event handler for toggle button click
  const toggleImportance = (id) => {
    const note = notes.find(note => (note.id === id))
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  // event handler to add new note to notes
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // function to handle new note input
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>

      <ul>
        {notesToShow.map(note => 
          <Note 
          key={note.id} 
          note={note} 
          toggleImportance={() => toggleImportance(note.id)} 
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  

      <Footer />
    </div>
  )
}

export default App 