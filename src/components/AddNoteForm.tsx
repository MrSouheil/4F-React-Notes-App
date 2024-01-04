import React, { useEffect } from "react";
import { minHeight, minWidth } from "../shared/constants";
import { generateRandomID } from "../shared/utils";
import { useNotesStore } from "../Store";

function AddNoteForm() {
  const {
    notes,
    noteBeingEdited,
    noteContentInput,
    setNoteContentInput,
    notePriorityInput,
    setNotePriorityInput,
    noteCategoryInput,
    setNoteCategoryInput,
    addNote,
    editNote,
    deleteNote,
    setNoteBeingEdited,
  } = useNotesStore();

  function handleAddNote() {
    if (!noteContentInput || !notePriorityInput || !noteCategoryInput) {
      return;
    }
    let note = {
      id: noteBeingEdited.id ? noteBeingEdited.id : generateRandomID(),
      content: noteContentInput,
      priority: notePriorityInput,
      category: noteCategoryInput,
      author: {
        userName: "hsein",
        profile: "profile-pic.webp",
      },
    };

    // Adding note to the store
    addNote(note);

    // Update local storage
    updateLocalStorage();
  }

  // Helper function to update local storage
  function updateLocalStorage() {
    const currentNotes = notes; // Assuming 'notes' holds the current state of your notes
    localStorage.setItem("notes", JSON.stringify(currentNotes));
  }

  return (
    <form
      style={{ width: minWidth, height: minHeight }}
      className="Form flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl"
    >
      <div className="flex flex-col text-start">
        <label htmlFor="note-content">Content</label>
        <textarea
          className="border-[1px] p-2 rounded border-black"
          name="note-content"
          id="note-content"
          onChange={(event) => setNoteContentInput(event.target.value)}
          value={noteContentInput}
        ></textarea>
      </div>
      <div className="flex flex-col text-start">
        <label htmlFor="note-priority">Priority</label>
        {[1, 2, 3, 4, 5].map((priority) => {
          return (
            <span key={priority} className="flex gap-4 items-center">
              <input
                type="radio"
                name="priority"
                value={priority}
                id={"priority-" + priority}
                onChange={(event) => {
                  setNotePriorityInput(priority);
                }}
                checked={notePriorityInput === priority}
              />
              <label htmlFor={"priority-" + priority}>
                {"priority-" + priority}
              </label>
            </span>
          );
        })}
      </div>

      <div className="flex flex-col justify-start text-start">
        <label htmlFor="note-category">Category</label>
        <select
          name="note-category"
          id="note-category"
          onChange={(event) => {
            setNoteCategoryInput(event.target.value);
          }}
          value={noteCategoryInput}
        >
          <option value="">Select Category</option>
          <option value="home">home</option>
          <option value="hobbies">hobbies</option>
          <option value="work">work</option>
        </select>
      </div>

      <button onClick={handleAddNote} type="button" className="bg-green-300">
        Add Note
      </button>
    </form>
  );
}

export default AddNoteForm;
