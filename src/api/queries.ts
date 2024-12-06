import { Note, User, UserToAuth } from "@/types"
import { request } from "./request"

export function logIn(user: UserToAuth) {
  const params = new URLSearchParams(user)

  return request<User[]>(`/users?${params}`)
}

export function getNote(id: Note["id"]) {
  return request<Note>(`/notes/${id}`)
}

export function getNotes(userId?: User["id"]) {
  if (!userId) {
    return []
  }

  const params = new URLSearchParams({
    userId,
  })

  return request<Note[]>(`/notes?${params}`)
}

export function getUser(id: User["id"]) {
  return request<User>(`/users/${id}`)
}

export function getUsersByEmail(email: User["email"]) {
  return request<User[]>(`/users?email=${email}`)
}
