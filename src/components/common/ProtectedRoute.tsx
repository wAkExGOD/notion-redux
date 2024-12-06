import { Navigate } from "react-router-dom"
import { PropsWithChildren } from "react"
import { routes } from "@/lib/routes"
import { useAppSelector } from "@/hooks/redux"
import { selectIsLoading, selectUser } from "@/redux/user/selectors"

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectIsLoading)

  if (isLoading) {
    return null
  }

  if (!user) {
    return <Navigate to={routes.logIn} />
  }

  return children
}
