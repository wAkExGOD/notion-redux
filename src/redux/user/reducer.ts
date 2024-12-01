import { UserEntity } from "@/types"
import * as actionTypes from "./actionTypes"

export type UserStore = {
  user: UserEntity | null
  error: Error | null
  loading: boolean
}

type Action =
  | { type: typeof actionTypes.fetchStart }
  | { type: typeof actionTypes.fetchSuccess }
  | { type: typeof actionTypes.fetchError; payload: Error }
  | { type: typeof actionTypes.setUser; payload: UserEntity }

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
    case actionTypes.fetchStart:
      return { ...state, loading: true }
    case actionTypes.fetchSuccess:
      return { ...state, loading: false }
    case actionTypes.fetchError:
      return { ...state, loading: false, error: action.payload }
    case actionTypes.setUser:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
