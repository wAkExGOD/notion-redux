import { getNote } from "@/api/queries"
import { PagesNavigation } from "@/components/common"
import { Heading, Textarea } from "@/components/ui"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export const Note = () => {
  const { id } = useParams()

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    enabled: Boolean(id),
    queryKey: ["notes", id],
    queryFn: () => getNote(String(id)),
  })

  if (isLoading) {
    return <p>Loading note...</p>
  }

  if (error) {
    return <p className="text-red-500">There is no such note</p>
  }

  if (!note) {
    return <p className="text-red-500">Can't load note #{id}</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <PagesNavigation noteId={note.id} />
      <Heading>{note.name}</Heading>
      {note.text && (
        <Textarea value={note.text} rows={7} readOnly className="mt-2" />
      )}
    </div>
  )
}
