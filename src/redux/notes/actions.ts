import {
  NoteEntity,
  NoteEntityToCreate,
  NoteEntityToUpdate,
  UserEntity,
} from "@/types"
import { AppDispatch } from "../store"
import * as queries from "@/api/queries"
import * as mutations from "@/api/mutations"
import * as actionTypes from "./actionTypes"
import { toast } from "@/hooks/useToast"

export const fetchNotes =
  (userId: UserEntity["id"]) => async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.FETCH_START })

    try {
      const notes = await queries.getNotes(userId)

      if (!notes) {
        throw new Error("Can't load notes. Please try again")
      }

      dispatch({ type: actionTypes.FETCH_SUCCESS })
      dispatch({ type: actionTypes.SET_NOTES_FETCHED })
      dispatch({ type: actionTypes.SET_NOTES, payload: notes })
    } catch (error) {
      const errorMessage = (error as Error)?.message || "Error"
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: new Error(errorMessage),
      })
      toast({
        title: errorMessage,
        variant: "destructive",
      })
    }
  }

export const fetchNote =
  (noteId: NoteEntity["id"]) => async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.FETCH_START })

    try {
      const note = await queries.getNote(noteId)

      if (!note) {
        throw new Error("Can't load note")
      }

      dispatch({ type: actionTypes.FETCH_SUCCESS })
      dispatch({ type: actionTypes.UPDATE_NOTE, payload: note })

      return note
    } catch (error) {
      const errorMessage = (error as Error)?.message || "Error"
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: new Error(errorMessage),
      })
      toast({
        title: errorMessage,
        variant: "destructive",
      })
    }
  }

export const createNote =
  (note: NoteEntityToCreate) => async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.FETCH_START })

    try {
      const createdNote = await mutations.createNote(note)

      dispatch({ type: actionTypes.FETCH_SUCCESS })
      dispatch({ type: actionTypes.CREATE_NOTE, payload: createdNote })

      toast({
        title: "You have successfully created note",
      })

      return createdNote
    } catch (error) {
      const errorMessage = (error as Error)?.message || "Note creation failed"
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: new Error(errorMessage),
      })
      toast({
        title: errorMessage,
        variant: "destructive",
      })
    }
  }

export const updateNote =
  (note: NoteEntityToUpdate) => async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.FETCH_START })

    try {
      const editedNote = await mutations.editNote(note)

      dispatch({ type: actionTypes.FETCH_SUCCESS })
      dispatch({ type: actionTypes.UPDATE_NOTE, payload: note })

      toast({
        title: `You have successfully edited note #${note.id}`,
      })

      return editedNote
    } catch (error) {
      const errorMessage = (error as Error)?.message || "Note editing failed"
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: new Error(errorMessage),
      })
      toast({
        title: errorMessage,
        variant: "destructive",
      })
    }
  }

export const deleteNote =
  (noteId: NoteEntity["id"]) => async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.FETCH_START })

    try {
      await mutations.deleteNote(noteId)

      dispatch({ type: actionTypes.FETCH_SUCCESS })
      dispatch({ type: actionTypes.DELETE_NOTE, payload: noteId })

      toast({
        title: `You have successfully deleted note #${noteId}`,
      })

      return noteId
    } catch (error) {
      const errorMessage = (error as Error)?.message || "Note deleting failed"
      dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: new Error(errorMessage),
      })
      toast({
        title: errorMessage,
        variant: "destructive",
      })
    }
  }
