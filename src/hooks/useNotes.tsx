import { getNotes } from "@/api/queries"
import { NoteEntity } from "@/types"
import { PropsWithChildren, createContext, useContext } from "react"
import { useAppSelector } from "./redux"
import { selectUser } from "@/redux/user/selectors"

export type NotesContextType = {
  isLoading: boolean
  error: Error | null
  refetch: () => void
  notes?: NoteEntity[]
}

const NotesContext = createContext<NotesContextType | null>(null)

const NotesProvider = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(selectUser)
  // const {
  //   data: notes,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useQuery({
  //   enabled: Boolean(user?.id),
  //   queryKey: ["notes"],
  //   queryFn: () => getNotes(user?.id),
  // })
  const isLoading = true
  const error = null
  const notes = undefined
  const refetch = () => {}

  return (
    <NotesContext.Provider
      value={{
        isLoading,
        error,
        notes,
        refetch,
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

const useNotes = () => useContext(NotesContext) as NotesContextType

// eslint-disable-next-line react-refresh/only-export-components
export { NotesProvider, useNotes }
