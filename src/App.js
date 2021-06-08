import Notes from "./Notes";
import "./app.css";
import { useState, useEffect } from "react";
const initialNotes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setNotes(initialNotes);
  }, []);

  const handleInput = (event) => {
    setNewNote(event.target.value);
  };

  const saveNewNote = (event) => {
    event.preventDefault();

    const noteToAdd = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5 ? true : false,
    };

    setNotes([...notes, noteToAdd]);

    setNewNote("");
  };

  const handleShowAll = () => {
    // Ambas hacen lo mismo, devuelven lo contrario
    // !showAll ? setShowAll(true) : setShowAll(false);
    setShowAll(!showAll);
  };

  return (
    <>
      <main>
        <h1>Mis notas 🤟</h1>
        <button onClick={handleShowAll}>
          {showAll ? "Ver solo notas importantes" : "Ver todas las notas"}
        </button>
        {notes.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ol>
            {notes
              .filter((note) => {
                if (showAll) return true;
                return note.important === true;
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
  );
};
export default App;
