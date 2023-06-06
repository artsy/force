import {
  CategoryPreferences,
  Destination,
} from "@segment/consent-manager/types/types"
import {
  DEFAULT_OPT_IN_PREFERENCES,
  DestinationId,
} from "Components/CookieConsentManager/categories"
import { FC, ReactNode, createContext, useContext, useState } from "react"

const CookieConsentManagerContext = createContext<{
  destinations: Destination[]
  isDestinationAllowed: (id: DestinationId) => boolean
  openConsentManager: () => void
  preferences: CategoryPreferences
  setDestinations: (destinations: Destination[]) => void
  setPreferences: (preferences: CategoryPreferences) => void
  /**
   * Is the consent manager loaded and context ready? We have to wait for Segment to return
   * the list of destinations before anything can be used. So this remains `false` while that happens.
   * You may want to use this field to gate rendering of a manage consent button, while we don't know
   * if the user requires consent or not.
   */
  ready: boolean
}>({
  destinations: [],
  /**
   * Is the destination allowed by the user's preferences?
   * This will always return `false` until the consent manager is ready. Thereafter
   * it is governed by the user's stored preference or the regions' default.
   */
  isDestinationAllowed: () => false,
  openConsentManager: () => {},
  preferences: DEFAULT_OPT_IN_PREFERENCES,
  setDestinations: () => {},
  setPreferences: () => {},
  ready: false,
})

interface CookieConsentManagerProviderProps {
  openConsentManager: () => void
  children: ReactNode
}

export const CookieConsentManagerProvider: FC<CookieConsentManagerProviderProps> = ({
  children,
  openConsentManager,
}) => {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [preferences, setPreferences] = useState<CategoryPreferences>(
    DEFAULT_OPT_IN_PREFERENCES
  )

  const ready = destinations.length > 0

  const isDestinationAllowed = (id: DestinationId) => {
    if (!ready) return false
    const destination = destinations.find(destination => destination.id === id)
    return !!(destination && preferences[destination.category])
  }

  return (
    <CookieConsentManagerContext.Provider
      value={{
        destinations,
        isDestinationAllowed,
        openConsentManager,
        preferences,
        setDestinations,
        setPreferences,
        ready,
      }}
    >
      {children}
    </CookieConsentManagerContext.Provider>
  )
}

export const useCookieConsentManager = () => {
  return useContext(CookieConsentManagerContext)
}
