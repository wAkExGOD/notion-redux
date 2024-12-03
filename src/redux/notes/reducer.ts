import { NoteEntity } from "@/types"
import * as actionTypes from "./actionTypes"

export type NotesStore = {
  notes: NoteEntity[]
  error: Error | null
  loading: boolean
  fetched: boolean
}

type Action =
  | { type: typeof actionTypes.FETCH_START }
  | { type: typeof actionTypes.FETCH_SUCCESS }
  | { type: typeof actionTypes.FETCH_ERROR; payload: Error }
  | { type: typeof actionTypes.SET_NOTES; payload: NoteEntity[] }
  | { type: typeof actionTypes.SET_NOTES_FETCHED }
  | { type: typeof actionTypes.CREATE_NOTE; payload: NoteEntity }
  | { type: typeof actionTypes.UPDATE_NOTE; payload: NoteEntity }
  | { type: typeof actionTypes.DELETE_NOTE; payload: NoteEntity["id"] }

const DEFAULT_STATE: NotesStore = {
  notes: [],
  error: null,
  loading: false,
  fetched: false,
} as const

export default function notesReducer(
  state: NotesStore = DEFAULT_STATE,
  action: Action
) {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, loading: true }
    case actionTypes.FETCH_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }
    case actionTypes.SET_NOTES:
      return { ...state, notes: [...state.notes, ...action.payload] }
    case actionTypes.SET_NOTES_FETCHED:
      return { ...state, fetched: true }
    case actionTypes.CREATE_NOTE:
      return { ...state, notes: [...state.notes, action.payload] }
    case actionTypes.UPDATE_NOTE: {
      const note = action.payload

      const index = state.notes.findIndex(({ id }) => id === note.id)
      const newNotes = [...state.notes]
      newNotes[index] = note

      return { ...state, notes: newNotes }
    }
    case actionTypes.DELETE_NOTE: {
      const newNotes = [...state.notes].filter(
        ({ id }) => id !== action.payload
      )

      return { ...state, notes: newNotes }
    }
    default:
      return state
  }
}
