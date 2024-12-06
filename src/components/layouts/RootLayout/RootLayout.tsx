import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectUser } from "@/redux/user/selectors"
import { useEffect } from "react"
import { fetchMe } from "@/redux/user/actions"

export const RootLayout = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  useEffect(() => {
    if (!user) {
      dispatch(fetchMe())
    }
  }, [])

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
