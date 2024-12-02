import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectUser } from "@/redux/user/selectors"
import { selectIsFetched } from "@/redux/notes/selectors"
import { useEffect } from "react"
import { fetchNotes } from "@/redux/notes/actions"

export const RootLayout = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const firstFetched = useAppSelector(selectIsFetched)

  useEffect(() => {
    if (!user || firstFetched) {
      return
    }

    dispatch(fetchNotes(user.id))
  }, [user])

  return (
    <>
      <div className="min-h-[100vh] flex flex-col font-sans">
        <Header />
        <div className="w-[1300px] max-w-full mx-auto px-4 py-6">
          <Outlet />
        </div>
        <Footer />
      </div>
      <Toaster />
    </>
  )
}
