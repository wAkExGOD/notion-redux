import { NoteSkeletons } from "./NoteSkeletons"
import { Note } from "./Note"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectUser } from "@/redux/user/selectors"
import { selectIsFetched } from "@/redux/notes/selectors"
import { useEffect } from "react"
import { fetchNotes } from "@/redux/notes/actions"

export const NoteList = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const firstFetched = useAppSelector(selectIsFetched)
  const { error, loading, notes } = useAppSelector((state) => state.notes)

  useEffect(() => {
    if (!user || firstFetched) {
      return
    }

    dispatch(fetchNotes(user.id))
  }, [user])

  if (loading) {
    return <NoteSkeletons />
  }

  if (error) {
    return <p className="text-red-500">{error.message}</p>
  }

  if (!notes) {
    return <p className="text-red-500">Can't get notes</p>
  }

  return (
    <div className="flex flex-col w-full gap-2">
      {notes.length > 0 ? (
        notes
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((note) => <Note key={note.id} data={note} />)
      ) : (
        <p className="text-center text-slate-600">You have no notes</p>
      )}
    </div>
  )
}
