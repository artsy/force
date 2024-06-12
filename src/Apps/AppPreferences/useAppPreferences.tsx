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
  updatePreferences: (nextPreferences: Partial<AppPreferences>) => Promise<any>
}>({
  preferences: DEFAULT_PREFERENCES,
  updatePreferences: () => Promise.resolve(),
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

  const isProcessing = useRef(false)
  const queue = useRef<(() => Promise<any>)[]>([])

  const processQueue = useCallback(() => {
    if (queue.current.length === 0) return
    const next = queue.current.shift()
    if (!next) return
    return next().then(processQueue)
  }, [])

  const updatePreferences = useCallback(
    (nextPreferences: Partial<AppPreferences>): Promise<any> => {
      return new Promise((resolve, reject) => {
        // Optimistically update preferences
        setPreferences(prevPreferences => ({
          ...prevPreferences,
          ...nextPreferences,
        }))

        const operation = async () => {
          try {
            const response = await fetch("/api/app-preferences", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(nextPreferences),
            })

            resolve(await response.json())
          } catch (err) {
            reject(err)
          }
        }

        // Add the update operation to the queue
        queue.current.push(operation)

        // If we're not already processing the queue, start now
        if (!isProcessing.current) {
          isProcessing.current = true
          processQueue().finally(() => {
            isProcessing.current = false
          })
        }
      })
    },
    [processQueue]
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
