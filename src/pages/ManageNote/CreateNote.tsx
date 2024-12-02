import { useNavigate } from "react-router-dom"
import { NoteForm, NoteFormValues } from "./NoteForm"
import { routes } from "@/lib/routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectUser } from "@/redux/user/selectors"
import { createNote } from "@/redux/notes/actions"
import { selectIsLoading } from "@/redux/notes/selectors"

export const CreateNote = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectIsLoading)

  const handleSubmit = (note: NoteFormValues) => {
    if (!user) {
      return
    }

    dispatch(createNote({ ...note, userId: user.id })).then((createdNote) => {
      if (!createdNote) {
        return
      }

      navigate(routes.notes._create(createdNote.id))
    })
  }

  return <NoteForm onSubmit={handleSubmit} processing={loading} />
}
