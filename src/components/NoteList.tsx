import React from 'react'
import Note from './Note'
import { minHeight, minWidth } from '../shared/constants'

function NotesList({notes, editNote, deleteNote}:{notes:Array<any>, editNote:Function, deleteNote:Function}) {

  return (
    <div style={{width:minWidth, height:minHeight}} className='NoteList flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-xl overflow-y-auto'>
        {
            notes.map((note) => {
                return <Note note={note} editNote={editNote} deleteNote={deleteNote}/>
            })
        }
    </div>
  )
}

export default NotesList