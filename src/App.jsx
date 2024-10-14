import "./globals.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Note } from "./components/Note";
import { MyVerticallyCenteredModal } from "./components/Modal";

function App() {
  const [toNoteList, setTonoteList] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", note: "" });
  const [modalShow, setModalShow] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const addNote = () => {
    const date = new Date();
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = date.toLocaleString("en-US", options);
    const note = {
      id: nanoid(),
      title: newNote.title,
      noteName: newNote.note,
      formattedDate: formattedDate,
    };
    setTonoteList([...toNoteList, note]);
    setNewNote({ title: "", note: "" });
  };
  const updateNote = (id, updatedNote) => {
    setTonoteList((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note
      )
    );
  };
  const deleteNote = (id) => {
    setTonoteList(toNoteList.filter((note) => note.id !== id));
  };

  const showNoteModal = (note) => {
    const date = new Date();
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = date.toLocaleString("en-US", options);
    setSelectedNote({
      ...note,
      formattedDate: formattedDate,
    });
    setModalShow(true);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          onChange={handleChange}
          className="textAreaTitle"
          placeholder="Title"
          name="title"
          value={newNote.title}
        />
        <textarea
          onChange={handleChange}
          className="textArea"
          placeholder="Enter a Note ..."
          name="note"
          value={newNote.note}
        ></textarea>

        <button
          onClick={addNote}
          className="button"
          disabled={newNote.note.trim() === ""}
        >
          Add Note
        </button>
      </div>
      <div className="list">
        {toNoteList.map((note) => (
          <Note
            key={note.id}
            noteName={note.noteName}
            title={note.title}
            id={note.id}
            formattedDate={note.formattedDate}
            deleteNote={deleteNote}
            showNoteModal={() => showNoteModal(note)}
          />
        ))}
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedNote={selectedNote}
        onUpdateNote={updateNote}
      />
    </div>
  );
}

export default App;
