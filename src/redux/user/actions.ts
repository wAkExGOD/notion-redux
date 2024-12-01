import { UserEntityToAuth } from "@/types"
import { AppDispatch } from "../store"
import { logIn } from "@/api/queries"
import { toast } from "@/hooks/useToast"
import { register } from "@/api/mutations"
import { fetchError, fetchStart, fetchSuccess, setUser } from "./actionTypes"

const LOCAL_STORAGE_USER_KEY = "user"

export const initUser = () => (dispatch: AppDispatch) => {
  const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY)

  if (!user) {
    return
  }

  dispatch({ type: setUser, payload: JSON.parse(user) })

  return user
}

export const fetchLogIn =
  (userCredentials: UserEntityToAuth) => async (dispatch: AppDispatch) => {
    dispatch({ type: fetchStart })

    const data = await logIn(userCredentials)

    if (!data || data.length === 0) {
      const errorMessage =
        "Error: Incorrect login credentials. Please try again."
      dispatch({
        type: fetchError,
        payload: new Error(errorMessage),
      })
      toast({
        title: errorMessage,
        variant: "destructive",
      })
      throw new Error(errorMessage)
    }

    const user = data[0]

    toast({
      title: "You have logged in successfully!",
    })

    dispatch({ type: fetchSuccess })
    dispatch({ type: setUser, payload: user })
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))

    return user
  }

export const fetchRegister =
  (userCredentials: UserEntityToAuth) => async (dispatch: AppDispatch) => {
    dispatch({ type: fetchStart })

    try {
      const user = await register(userCredentials)

      toast({
        title: "You have successfully registered",
      })

      dispatch({ type: fetchSuccess, payload: user })
      dispatch({ type: setUser, payload: user })
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))

      return user
    } catch (error) {
      toast({
        title: "Registration failed. Please try again later",
        description: (error as Error)?.message,
        variant: "destructive",
      })
    }
  }

export const logOut = () => async (dispatch: AppDispatch) => {
  dispatch({ type: setUser, payload: null })

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(null))

  toast({
    title: "You have logged out successfully!",
  })
}
