import React from 'react'


function Note({note, editNote, deleteNote}:{note:any, editNote:Function, deleteNote:Function}) {
  return (
    <div className="flex gap-[19px] bg-red-200 p-6 rounded-xl justify-between">
      <div className="overflow-hidden w-[50px] rounded-full">
        <img className="w-full" src={note.author.profile} alt="profile" />
      </div>
      <div className="text-start w-full">
        {note.content}
      </div>
      <div className="flex flex-col gap-4">
        <span onClick={()=>editNote(note.id)} className="bg-blue-200 cursor-pointer rounded p-1" >edit</span>
        <span onClick={()=>deleteNote(note.id)} className="bg-red-500 cursor-pointer rounded p-1">delete</span>
      </div>
    </div>
  )
}

export default Note