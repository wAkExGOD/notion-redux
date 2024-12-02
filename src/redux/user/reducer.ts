import { UserEntity } from "@/types"
import * as actionTypes from "./actionTypes"

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
  loading: true,
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
