import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface notesStoreInterface {
    notes: any,
    sortOrder: 'asc'|'desc',
    setSortOrder: Function,
    noteBeingEdited: any,
    noteContentInput: string,
    setNoteContentInput: Function,
    notePriorityInput: number,
    setNotePriorityInput: Function,
    noteCategoryInput: string,
    setNoteCategoryInput: Function,
    addNote: Function,
    editNote: Function,
    deleteNote: Function,
    setNoteBeingEdited: Function,
    setNotes: (newNotes: any[]) => void;
}

export const useNotesStore = create<notesStoreInterface>(
    // @ts-ignore
    persist((set) => ({
        notes: [],
        setNotes: (newNotes) => set({ notes: newNotes }),
        sortOrder: 'asc',
        setSortOrder:(newSortOrder: 'asc'|'desc') => set((state:any)=>({sortOrder:newSortOrder})) ,
        noteBeingEdited: {},
        noteContentInput: '',
        setNoteContentInput: (content: string) => set((state: any) => ({ noteContentInput: content })),
        notePriorityInput: 1,
        setNotePriorityInput: (priority: number) => set((state: any) => ({ notePriorityInput: priority })),
        noteCategoryInput: '',
        setNoteCategoryInput: (category: string) => set((state: any) => ({ noteCategoryInput: category })),
        addNote: (note: any) => {
            console.log(note)
            set((state: any) => ({
                notes: [...state.notes, note],
                noteBeingEdited: {},
                noteContentInput: '',
                notePriorityInput: 1,
                noteCategoryInput: '',
            }))
        },
        editNote: (noteID: string) => {
            console.log(noteID)
            set((state: any) => {
                let note = state.notes.find((note: any) => note.id === noteID)
                if (!note) {
                    return {
                        noteBeingEdited: {},
                    }
                }
                
                // at this pt. we have found a note
                return {
                    notes: state.notes.filter(function (note: any) { return note.id !== noteID }),
                    noteBeingEdited: note,
                    noteContentInput: note.content,
                    notePriorityInput: note.priority,
                    noteCategoryInput: note.category,
                }
            })
        },
        deleteNote: (noteID: string) => set((state: any) => ({ notes: state.notes.filter(function (note: any) { return note.id !== noteID }) })),
        setNoteBeingEdited: (noteID: string) => set((state: any) => ({
            noteBeingEdited: state.notes.find((note: any) => note.id === noteID),
            notes: state.notes.filter(function (note: any) { return note.id !== noteID })
        }))
    }),{
        name: 'notes-storage',
        storage: createJSONStorage(() => localStorage),
    })
)