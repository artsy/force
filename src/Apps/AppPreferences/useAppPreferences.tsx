import { getENV } from "Utils/getENV"
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useState,
  useContext,
  useRef,
} from "react"
import * as Yup from "yup"

export const appPreferencesSchema = Yup.object({
  theme: Yup.string().oneOf(["light", "dark"]).required() as Yup.StringSchema<
    "light" | "dark"
  >,
})

export type AppPreferences = Yup.InferType<typeof appPreferencesSchema>

export const DEFAULT_PREFERENCES: AppPreferences = {
  theme: "light",
}

const AppPreferencesContext = createContext<{
  preferences: AppPreferences
  updatePreferences: (newPreferences: Partial<AppPreferences>) => void
}>({
  preferences: DEFAULT_PREFERENCES,
  updatePreferences: () => {},
})

interface AppPreferencesProviderProps {
  children: ReactNode
}

export const APP_PREFERENCES_SHARIFY_KEY = "APP_PREFERENCES"

export const AppPreferencesProvider: FC<AppPreferencesProviderProps> = ({
  children,
}) => {
  const initialPreferences =
    getENV(APP_PREFERENCES_SHARIFY_KEY) || DEFAULT_PREFERENCES

  const [preferences, setPreferences] = useState<AppPreferences>(
    initialPreferences
  )

  const restoredPreferences = useRef(preferences)
  const isUpdating = useRef(false)

  const updatePreferences = useCallback(
    (newPreferences: Partial<AppPreferences>) => {
      if (isUpdating.current) {
        return
      }

      isUpdating.current = true

      // Optimistically update preferences
      setPreferences(prevPreferences => ({
        ...prevPreferences,
        ...newPreferences,
      }))

      fetch("/api/app-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPreferences),
      })
        .then(response => response.json())
        .then(data => {
          restoredPreferences.current = data
        })
        .finally(() => {
          isUpdating.current = false
        })
        .catch(error => {
          console.error(error)
          // Rollback to previous preferences on error
          setPreferences(restoredPreferences.current)
        })
    },
    []
  )

  return (
    <AppPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </AppPreferencesContext.Provider>
  )
}

export const useAppPreferences = () => {
  return useContext(AppPreferencesContext)
}
