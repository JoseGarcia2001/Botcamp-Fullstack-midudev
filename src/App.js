import Notes from './components/Notes'
import './app.css'
import React, { useState, useEffect } from 'react'
import { createNote, getAllNotes } from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    getAllNotes()
      .then((data) => setNotes(data))
  }, [])

  const handleInput = (event) => {
    setNewNote(event.target.value)
  }

  const saveNewNote = (event) => {
    event.preventDefault()

    createNote(newNote)
      .then((noteToCreate) => {
        setNotes([...notes, noteToCreate])
      })
      .catch((err) => console.log(err))

    setNewNote('')
  }

  const handleShowAll = () => {
    // Ambas hacen lo mismo
    // !showAll ? setShowAll(true) : setShowAll(false);
    setShowAll(!showAll)
  }

  return (
    <>
      <main>
        <h1>Mis notas 🤟</h1>
        <button onClick={handleShowAll}>
          {showAll ? 'Ver solo notas importantes' : 'Ver todas las notas'}
        </button>
        {notes.length === 0
          ? (
          <p>Loading...</p>
            )
          : (
          <ol>
            {notes
              .filter((note) => {
                if (showAll) return true
                return note.important === true
              })
              .map((note) => (
                <Notes key={note.id} {...note} />
              ))}
          </ol>
            )}
        <hr></hr>
        <form onSubmit={saveNewNote}>
          <span>Escribe una nueva nota 😀</span>
          <input
            autoComplete="off"
            onChange={handleInput}
            value={newNote}
          ></input>
          <button>Guardar nota</button>
        </form>
      </main>
    </>
  )
}
export default App
