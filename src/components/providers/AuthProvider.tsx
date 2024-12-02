import { PropsWithChildren, useEffect } from "react"
import { initUser } from "@/redux/user/actions"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { selectIsLoading, selectUser } from "@/redux/user/selectors"

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const loading = useAppSelector(selectIsLoading)

  useEffect(() => {
    if (user) {
      return
    }

    dispatch(initUser())
  })

  if (loading) {
    return <p>Loading user...</p>
  }

  return children
}
