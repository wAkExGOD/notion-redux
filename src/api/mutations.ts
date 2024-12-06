import { request } from "./request"
import { Note, NoteToCreate, NoteToUpdate, User, UserToAuth } from "@/types"

export function register(user: UserToAuth) {
  return request<User>("/users", {
    method: "POST",
    body: JSON.stringify({ ...user, createdAt: Date.now() }),
  })
}

export function createNote(note: NoteToCreate) {
  return request<Note>("/notes", {
    method: "POST",
    body: JSON.stringify({ ...note, createdAt: Date.now() }),
  })
}

export function editNote(note: NoteToUpdate) {
  return request<Note>(`/notes/${note.id}`, {
    method: "PUT",
    body: JSON.stringify(note),
  })
}

export function deleteNote(id: Note["id"]) {
  return request<Note>(`/notes/${id}`, {
    method: "DELETE",
  })
}
