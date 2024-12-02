import { AppStore } from "../store"

export const selectNotes = (state: AppStore) => state.notes.notes

export const selectIsLoading = (state: AppStore) => state.notes.loading

export const selectIsFetched = (state: AppStore) => state.notes.fetched
