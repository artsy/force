import {
  CategoryPreferences,
  Destination,
} from "@segment/consent-manager/types/types"
import { useCookieConsentManager } from "Components/CookieConsentManager/CookieConsentManagerContext"
import { FC, useEffect } from "react"

interface CookieConsentManagerSetterProps {
  destinations: Destination[]
  preferences: CategoryPreferences
}

/**
 * We can't thread children through the `ConsentManagerBuilder` due to implications
 * with that library on server-side rendering. Instead, we use this component to
 * save the destinations and preferences to the context, which sits above the
 * `ConsentManagerBuilder` in the component tree.
 */
export const CookieConsentManagerSetter: FC<CookieConsentManagerSetterProps> = ({
  destinations,
  preferences,
}) => {
  const { setDestinations, setPreferences } = useCookieConsentManager()

  useEffect(() => {
    setDestinations(destinations)
    setPreferences(preferences)
  }, [destinations, preferences, setDestinations, setPreferences])

  return null
}
