import {
  createContextStore,
  Action,
  action,
  Computed,
  computed,
} from "easy-peasy"
import type {
  CategoryPreferences,
  Destination,
} from "@segment/consent-manager/types/types"
import {
  DEFAULT_OPT_IN_PREFERENCES,
  type DestinationId,
} from "Components/CookieConsentManager/categories"
import { type FC, type ReactNode } from "react"

// Store model interface
interface CookieConsentManagerStoreModel {
  // State
  destinations: Destination[]
  preferences: CategoryPreferences
  openConsentManager: () => void

  // Computed
  ready: Computed<CookieConsentManagerStoreModel, boolean>

  // Actions
  setDestinations: Action<CookieConsentManagerStoreModel, Destination[]>
  setPreferences: Action<CookieConsentManagerStoreModel, CategoryPreferences>
  setOpenConsentManager: Action<CookieConsentManagerStoreModel, () => void>
}

// Create the context store
export const CookieConsentManagerStore =
  createContextStore<CookieConsentManagerStoreModel>(runtimeModel => ({
    // State
    destinations: runtimeModel?.destinations || [],
    preferences: runtimeModel?.preferences || DEFAULT_OPT_IN_PREFERENCES,
    openConsentManager: runtimeModel?.openConsentManager || (() => {}),

    // Computed
    ready: computed(state => state.destinations.length > 0),

    // Actions
    setDestinations: action((state, payload) => {
      state.destinations = payload
    }),

    setPreferences: action((state, payload) => {
      state.preferences = payload
    }),

    setOpenConsentManager: action((state, payload) => {
      state.openConsentManager = payload
    }),
  }))

interface CookieConsentManagerProviderProps {
  openConsentManager: () => void
  children: ReactNode
}

// Provider component
export const CookieConsentManagerProvider: FC<
  React.PropsWithChildren<CookieConsentManagerProviderProps>
> = ({ children, openConsentManager }) => {
  return (
    <CookieConsentManagerStore.Provider runtimeModel={{ openConsentManager }}>
      {children}
    </CookieConsentManagerStore.Provider>
  )
}

// Backward compatible hook
export const useCookieConsentManager = () => {
  const state = CookieConsentManagerStore.useStoreState(state => state)
  const actions = CookieConsentManagerStore.useStoreActions(actions => actions)

  // Helper function that needs access to current state
  const isDestinationAllowed = (id: DestinationId) => {
    if (!state.ready) return false
    const destination = state.destinations.find(
      destination => destination.id === id,
    )
    return !!(destination && state.preferences[destination.category])
  }

  return {
    destinations: state.destinations,
    isDestinationAllowed,
    openConsentManager: state.openConsentManager,
    preferences: state.preferences,
    setDestinations: actions.setDestinations,
    setPreferences: actions.setPreferences,
    ready: state.ready,
  }
}

// Export alias for migration compatibility
export const CookieConsentManagerContext = CookieConsentManagerStore
