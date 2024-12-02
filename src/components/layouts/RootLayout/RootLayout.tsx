import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui"
import { AuthProvider, NotesProvider } from "@/components/providers"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const RootLayout = () => {
  return (
    <AuthProvider>
      <NotesProvider>
        <div className="min-h-[100vh] flex flex-col font-sans">
          <Header />
          <div className="w-[1300px] max-w-full mx-auto px-4 py-6">
            <Outlet />
          </div>
          <Footer />
        </div>
        <Toaster />
      </NotesProvider>
    </AuthProvider>
  )
}
