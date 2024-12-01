import { useNavigate } from "react-router-dom"
import { createNote as createNoteMutation } from "@/api/mutations"
import { useAuth } from "@/hooks/useAuth"
import { NoteForm, NoteFormValues } from "./NoteForm"
import { useNotes } from "@/hooks/useNotes"
import { toast } from "@/hooks/useToast"
import { routes } from "@/lib/routes"
import { useAppSelector } from "@/hooks/redux"
import { selectUser } from "@/redux/user/selectors"

export const CreateNote = () => {
  const user = useAppSelector(selectUser)
  const { refetch: refetchNotes } = useNotes()
  const navigate = useNavigate()

  // const { mutate: createNote, isPending } = useMutation({
  //   mutationFn: createNoteMutation,
  //   onSuccess: (note) => {
  //     toast({
  //       title: "You have successfully created a note",
  //     })

  //     refetchNotes()

  //     navigate(routes.notes._create(note.id))
  //   },
  //   onError: (error) =>
  //     toast({
  //       title: "Note creation failed",
  //       description: error.message,
  //       variant: "destructive",
  //     }),
  // })

  const handleSubmit = (note: NoteFormValues) => {
    // createNote({
    //   ...note,
    //   userId: user.id,
    // })
    console.log("createNote")
  }

  return <NoteForm onSubmit={handleSubmit} processing={isPending} />
}
