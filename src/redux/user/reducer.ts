import { UserEntity } from "@/types"
import * as actionTypes from "./actionTypes"

export const LOCAL_STORAGE_USER_ID_KEY = "user-id"

export type UserStore = {
  user: UserEntity | null
  error: Error | null
  loading: boolean
}

type Action =
  | { type: typeof actionTypes.FETCH_START }
  | { type: typeof actionTypes.FETCH_SUCCESS }
  | { type: typeof actionTypes.FETCH_ERROR; payload: Error }
  | { type: typeof actionTypes.SET_USER; payload: UserEntity }

const DEFAULT_STATE: UserStore = {
  user: null,
  error: null,
  loading: false,
} as const

export default function userReducer(
  state: UserStore = DEFAULT_STATE,
  action: Action
) {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return { ...state, loading: true }
    case actionTypes.FETCH_SUCCESS:
      return { ...state, loading: false }
    case actionTypes.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }
    case actionTypes.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
