import React, { useEffect, useState } from 'react';
import './App.css';
import NotesList from "./components/NotesList";
import AddNoteForm from "./components/AddNoteForm";
import { useNotesStore } from "./Store";

function App() {
  const { notes, setNotes, deleteNote } = useNotesStore();

  const {setNoteBeingEdited} = useNotesStore()

  useEffect(() => {
    // Load notes from local storage when the app starts
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [setNotes]);
  
  // takes note outside of notes array, and populates form with its values
  function editNote(noteID: number) {
    let noteToEdit = notes.find((note:any) => note.id === noteID)
    // if we found note in notes array
    if (noteToEdit) {
      setNoteBeingEdited(noteToEdit.id)
      // setNotes(notes.filter(function (note) { return note.id !== noteID }))
    }
  }

  return (
    <div className="App flex justify-center items-center h-screen gap-[2rem] bg-[var(--accent-light)]">
      <NotesList deleteNote={deleteNote} />
      <AddNoteForm />
    </div>
  );
}

export default App;
