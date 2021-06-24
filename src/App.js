import Notes from './components/Notes'
import './app.css'
import React, { useState, useEffect } from 'react'
import { createNote, getAllNotes } from './services/notes.js'
import { login } from './services/login.js'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [inputError, setInputError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    getAllNotes()
      .then((data) => setNotes(data))
  }, [])

  const handleNotesInput = ({ target }) => {
    setNewNote(target.value)
  }

  const saveNewNote = async (event) => {
    try {
      event.preventDefault()

      if (!newNote) return setInputError('Write a note')

      const createdNote = await createNote(newNote)
      console.log(createdNote)
      setNotes([...notes, createdNote])
      setNewNote('')
      setInputError('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowAll = () => {
    // both cases do the same
    // !showAll ? setShowAll(true) : setShowAll(false);
    setShowAll(!showAll)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })
      .then(data => {
        console.log(data)
        console.log(data.token)
        setToken(data.token)
      })
      .catch(() => {
        setLoginError('Usuario o contraseña incorrectos')
        setUsername('')
        setPassword('')
      })
  }

  return (
    <>
    {token
      ? (<form onSubmit={saveNewNote}>
          <span>Write a new note 😀</span>
          <input
            type='text'
            placeholder={inputError}
            autoComplete="off"
            onChange={handleNotesInput}
            value={newNote}
          ></input>
          <button>Save note</button>
        </form>)
      : (<form onSubmit={handleLogin}>
          <label htmlFor="username">
            <span>Username</span>
            <input
              placeholder='Username'
              type='text'
              id="username"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
              name="username"
              >
            </input>
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <input
              placeholder='password'
              type="password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              name="password">
            </input>
          </label>
          <span>{loginError}</span>
          <button>Login</button>
        </form>)
      }

      <main>
        <h1>My notes 🤟</h1>
        <button onClick={handleShowAll}>
          {showAll ? 'Only important notes' : 'All notes'}
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

      </main>
    </>
  )
}
export default App
