import { UserEntityToAuth } from "@/types"
import { AppDispatch } from "../store"
import { logIn } from "@/api/queries"
import { toast } from "@/hooks/useToast"
import { register } from "@/api/mutations"
import { LOCAL_STORAGE_USER_KEY } from "./reducer"
import * as actionTypes from "./actionTypes"

export const fetchLogIn =
  (userCredentials: UserEntityToAuth) => async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.FETCH_START })

    const data = await logIn(userCredentials)

    if (!data || data.length === 0) {
      const errorMessage =
        "Error: Incorrect login credentials. Please try again."
      dispatch({
        type: actionTypes.FETCH_ERROR,
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

    dispatch({ type: actionTypes.FETCH_SUCCESS })
    dispatch({ type: actionTypes.SET_USER, payload: user })
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))

    return user
  }

export const fetchRegister =
  (userCredentials: UserEntityToAuth) => async (dispatch: AppDispatch) => {
    dispatch({ type: actionTypes.FETCH_START })

    try {
      const user = await register(userCredentials)

      toast({
        title: "You have successfully registered",
      })

      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: user })
      dispatch({ type: actionTypes.SET_USER, payload: user })
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
  dispatch({ type: actionTypes.SET_USER, payload: null })

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(null))

  toast({
    title: "You have logged out successfully!",
  })
}
