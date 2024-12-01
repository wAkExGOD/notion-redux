import { PropsWithChildren, useEffect } from "react"
import { initUser } from "@/redux/user/actions"
import { useAppDispatch } from "@/hooks/redux"

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initUser())
  })

  return children
}
