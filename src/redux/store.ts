import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { thunk } from "redux-thunk"
import userReducer, { UserStore } from "./user/reducer"
import notesReducer, { NotesStore } from "./notes/reducer"

export const store = createStore(
  combineReducers({
    user: userReducer,
    notes: notesReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = {
  user: UserStore
  notes: NotesStore
}
