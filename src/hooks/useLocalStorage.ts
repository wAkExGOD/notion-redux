import { useState } from "react"

export const LOCAL_STORAGE_USER_KEY = "user"

export const useLocalStorage = (keyName: string, defaultValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName)

      if (value) {
        return JSON.parse(value)
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))

        return defaultValue
      }
    } catch (err) {
      console.log(err)

      return defaultValue
    }
  })

  const setValue = (newValue: unknown) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {
      console.log(err)
    }

    setStoredValue(newValue)
  }

  return [storedValue, setValue]
}
