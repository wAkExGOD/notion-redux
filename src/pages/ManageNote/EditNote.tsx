import { useNavigate, useParams } from "react-router-dom"
import { editNote as editNoteMutation } from "@/api/mutations"
import { getNote } from "@/api/queries"
import { NoteForm, NoteFormValues } from "./NoteForm"
import { toast } from "@/hooks/useToast"
import { routes } from "@/lib/routes"

export const EditNote = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()

  // const {
  //   data: note,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   enabled: Boolean(id),
  //   queryKey: ["notes", id],
  //   queryFn: () => getNote(String(id)),
  // })

  // const { mutate: editNote, isPending } = useMutation({
  //   mutationFn: editNoteMutation,
  //   onSuccess: (note) => {
  //     toast({
  //       title: `You have successfully edited note #${id}`,
  //     })

  //     refetchNotes()
  //     queryClient.setQueryData(["notes", id], note)

  //     navigate(routes.notes.root)
  //   },
  //   onError: (error) =>
  //     toast({
  //       title: "Note editing failed",
  //       description: error.message,
  //       variant: "destructive",
  //     }),
  // })

  const handleSubmit = (editedNote: NoteFormValues) => {
    if (!id) {
      return
    }

    // editNote({ ...note, ...editedNote, id, userId: user.id })
    console.log("editNote", editedNote)
  }

  // if (isLoading) {
  //   return <p>Loading note...</p>
  // }

  // if (error) {
  //   return <p className="text-red-500">There is no such note.</p>
  // }

  // if (!note) {
  //   return <p className="text-red-500">Can't load note #{id}</p>
  // }

  return (
    // <NoteForm
    //   onSubmit={handleSubmit}
    //   initialValues={note}
    //   processing={isPending}
    // />
    <p>note</p>
  )
}
