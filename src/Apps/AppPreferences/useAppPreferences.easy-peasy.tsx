import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import { getENV } from "Utils/getENV"
import { type FC, type ReactNode, createContext, useContext } from "react"
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

export const APP_PREFERENCES_SHARIFY_KEY = "APP_PREFERENCES"

// Easy-peasy store model interface
interface AppPreferencesStoreModel {
  // State
  preferences: AppPreferences
  isProcessing: boolean
  queue: (() => Promise<any>)[]

  // Actions
  setPreferences: Action<AppPreferencesStoreModel, Partial<AppPreferences>>
  setIsProcessing: Action<AppPreferencesStoreModel, boolean>
  addToQueue: Action<AppPreferencesStoreModel, () => Promise<any>>
  removeFromQueue: Action<AppPreferencesStoreModel>

  // Thunks
  updatePreferences: Thunk<
    AppPreferencesStoreModel,
    Partial<AppPreferences>,
    any,
    any,
    Promise<any>
  >
  processQueue: Thunk<AppPreferencesStoreModel>
}

// Create the context store
export const AppPreferencesStore = createContextStore<AppPreferencesStoreModel>(
  runtimeModel => {
    const initialPreferences =
      runtimeModel?.preferences ||
      getENV(APP_PREFERENCES_SHARIFY_KEY) ||
      DEFAULT_PREFERENCES

    return {
      // State
      preferences: initialPreferences,
      isProcessing: false,
      queue: [],

      // Actions
      setPreferences: action((state, payload) => {
        state.preferences = { ...state.preferences, ...payload }
      }),

      setIsProcessing: action((state, payload) => {
        state.isProcessing = payload
      }),

      addToQueue: action((state, payload) => {
        state.queue.push(payload)
      }),

      removeFromQueue: action(state => {
        state.queue.shift()
      }),

      // Thunks
      updatePreferences: thunk(async (actions, payload, { getState }) => {
        return new Promise((resolve, reject) => {
          // Optimistically update preferences
          actions.setPreferences(payload)

          const operation = async () => {
            try {
              const response = await fetch("/api/app-preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              })

              const result = await response.json()
              resolve(result)
            } catch (err) {
              reject(err)
            }
          }

          // Add the update operation to the queue
          actions.addToQueue(operation)

          // If we're not already processing the queue, start now
          const state = getState()
          if (!state.isProcessing) {
            actions.processQueue()
          }
        })
      }),

      processQueue: thunk(async (actions, _, { getState }) => {
        const state = getState()
        if (state.queue.length === 0) return

        actions.setIsProcessing(true)

        try {
          while (getState().queue.length > 0) {
            const next = getState().queue[0]
            if (next) {
              await next()
              actions.removeFromQueue()
            }
          }
        } finally {
          actions.setIsProcessing(false)
        }
      }),
    }
  },
)

// Legacy context for backward compatibility
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

export const AppPreferencesProvider: FC<
  React.PropsWithChildren<AppPreferencesProviderProps>
> = ({ children }) => {
  return (
    <AppPreferencesStore.Provider>
      <AppPreferencesProviderWrapper>{children}</AppPreferencesProviderWrapper>
    </AppPreferencesStore.Provider>
  )
}

// Internal wrapper to provide backward compatible context
const AppPreferencesProviderWrapper: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const preferences = AppPreferencesStore.useStoreState(
    state => state.preferences,
  )
  const updatePreferences = AppPreferencesStore.useStoreActions(
    actions => actions.updatePreferences,
  )

  return (
    <AppPreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </AppPreferencesContext.Provider>
  )
}

// Backward compatible hook
export const useAppPreferences = () => {
  return useContext(AppPreferencesContext)
}
