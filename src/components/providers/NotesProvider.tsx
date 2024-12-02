import { PropsWithChildren, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectUser } from "@/redux/user/selectors"
import { selectIsFetched } from "@/redux/notes/selectors"
import { fetchNotes } from "@/redux/notes/actions"

export const NotesProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const firstFetched = useAppSelector(selectIsFetched)

  useEffect(() => {
    if (!user || firstFetched) {
      return
    }

    dispatch(fetchNotes(user.id))
  }, [])

  return children
}
