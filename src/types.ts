export type User = {
  id: string
  email: string
  password: string
  createdAt: number
}

export type UserToAuth = Omit<User, "id" | "createdAt">

export type Note = {
  id: string
  userId: User["id"]
  name: string
  text: string
  createdAt: number
}

export type NoteToCreate = Omit<Note, "id" | "createdAt">

export type NoteToUpdate = Omit<Note, "createdAt">
