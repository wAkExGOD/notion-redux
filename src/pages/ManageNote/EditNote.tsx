import { useNavigate, useParams } from "react-router-dom"
import { NoteForm, NoteFormValues } from "./NoteForm"
import { routes } from "@/lib/routes"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectUser } from "@/redux/user/selectors"
import { selectNotes } from "@/redux/notes/selectors"
import { fetchNote, updateNote } from "@/redux/notes/actions"
import { useEffect, useState } from "react"
import { NoteEntity } from "@/types"
import { toast } from "@/hooks/useToast"

export const EditNote = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const user = useAppSelector(selectUser)
  const notes = useAppSelector(selectNotes)

  const [note, setNote] = useState<NoteEntity | null>(null)
  const { loading, error } = useAppSelector((state) => state.notes)

  const handleSubmit = (editedNote: NoteFormValues) => {
    if (!id || !user) {
      return
    }

    dispatch(updateNote({ ...note, ...editedNote, id, userId: user.id })).then(
      (createdNote) => {
        if (!createdNote) {
          return
        }

        navigate(routes.notes._create(createdNote.id))
      }
    )
  }

  useEffect(() => {
    const oldNote = notes.find(({ id: noteId }) => noteId === id)

    if (oldNote) {
      return setNote(oldNote)
    }

    if (!id) {
      return
    }

    dispatch(fetchNote(id)).then((note) => {
      if (!note) {
        return
      }

      setNote(note)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!note || !user) {
      return
    }

    if (note.userId !== user.id) {
      navigate(routes.notes.root)

      toast({
        title: "You don't have permission to access this note",
        variant: "destructive",
      })
    }
  }, [note])

  if (loading) {
    return <p>Loading note...</p>
  }

  if (error) {
    return <p className="text-red-500">There is no such note.</p>
  }

  if (!note) {
    return <p className="text-red-500">Can't load note #{id}</p>
  }

  return (
    <NoteForm
      onSubmit={handleSubmit}
      initialValues={note}
      processing={loading}
    />
  )
}
