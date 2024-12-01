import { AppStore } from "../store"

export const selectUser = (state: AppStore) => state.user.user

export const selectIsLoading = (state: AppStore) => state.user.loading
