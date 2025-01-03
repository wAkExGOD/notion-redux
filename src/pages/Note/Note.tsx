import { PagesNavigation } from "@/components/common"
import { Heading, Textarea } from "@/components/ui"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { routes } from "@/lib/routes"
import { fetchNote } from "@/redux/notes/actions"
import { selectUser } from "@/redux/user/selectors"
import { Note as NoteEntity } from "@/types"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Note = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [note, setNote] = useState<NoteEntity | null>(null)
  const user = useAppSelector(selectUser)
  const { notes, loading, error } = useAppSelector((state) => state.notes)

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
    if (error) {
      return navigate(routes.notFound, { replace: true })
    }

    if (!note || !user) {
      return
    }

    if (note.userId !== user.id) {
      return navigate(routes.notFound, { replace: true })
    }
  }, [note, error, user])

  if (loading) {
    return <p>Loading note...</p>
  }

  if (!note) {
    navigate(routes.notFound, { replace: true })

    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <PagesNavigation noteId={note.id} to={routes.notes.root} />
      <Heading>{note.name}</Heading>
      {note.text && (
        <Textarea value={note.text} rows={7} readOnly className="mt-2" />
      )}
    </div>
  )
}
