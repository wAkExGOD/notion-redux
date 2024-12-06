import { Link, useNavigate } from "react-router-dom"
import { Pencil, Trash } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui"
import { Note } from "@/types"
import { routes } from "@/lib/routes"
import { useAppDispatch } from "@/hooks/redux"
import { deleteNote } from "@/redux/notes/actions"

type NoteManagementButtonsProps = {
  noteId: Note["id"]
}

export const NoteManagementButtons: React.FC<NoteManagementButtonsProps> = ({
  noteId,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const removeNote = async (id: Note["id"]) => {
    try {
      await dispatch(deleteNote(id))

      navigate(routes.notes.root)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="ml-auto flex gap-2">
      <Link to={routes.notes.edit._create(noteId)}>
        <Button size="icon" variant="secondary">
          <Pencil />
        </Button>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="secondary">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removeNote(noteId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
