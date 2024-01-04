import React from 'react'
import Note from "./Note"
import { minHeight, minWidth } from "../shared/constants"
import { useNotesStore } from "../Store"

function NotesList({deleteNote}:{deleteNote:Function}) {
  const {
    notes,
    editNote,
    sortOrder,
    setSortOrder
  } = useNotesStore()
  
  const sortingCallbacks ={
    'desc': (a:any,b:any)=>b.priority-a.priority,
    'asc': (a:any,b:any)=>a.priority-b.priority
  }
  
  return (
    <div style={{ width: minWidth, height: minHeight }} className="NotesList flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl overflow-y-auto">
      <>
      <span className="flex justify-around">
        <p onClick={()=>setSortOrder('asc')}>Sort Asc</p>
        <p onClick={()=>setSortOrder('desc')}>Sort Desc</p>
      </span>
      {
         notes.sort(sortingCallbacks[sortOrder]).map((note:any) => {
          return <Note key={note.id} note={note} deleteNote={deleteNote} editNote={editNote} />
        })
      }
      </>
    </div>
  )
}

export default NotesList