import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, AppStore } from "@/redux/store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStore>()
