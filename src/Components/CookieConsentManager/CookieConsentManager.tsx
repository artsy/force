import { ActionType } from "@artsy/cohesion"
import type { SavedCookieConsentPreferences } from "@artsy/cohesion/dist/Schema/Events/CookieConsent"
import { useDidMount } from "@artsy/palette"
import { ConsentManagerBuilder } from "@segment/consent-manager"
import { CookieConsentBanner } from "Components/CookieConsentManager/CookieConsentBanner"
import { CookieConsentManagerProvider } from "Components/CookieConsentManager/CookieConsentManagerContext"
import { CookieConsentManagerDialog } from "Components/CookieConsentManager/CookieConsentManagerDialog"
import { CookieConsentManagerSetter } from "Components/CookieConsentManager/CookieConsentManagerSetter"
import {
  ALLOW_ALL_PREFERENCES,
  CUSTOM_DESTINATIONS,
  mapCustomPreferences,
  remapSegmentCategory,
} from "Components/CookieConsentManager/categories"
import { useConsentRequired } from "Components/CookieConsentManager/useConsentRequired"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMode } from "Utils/Hooks/useMode"
import { getENV } from "Utils/getENV"
import type { FC, ReactNode } from "react"
import { useTracking } from "react-tracking"

export const COOKIE_CONSENT_MANAGER_COOKIE_NAME = "tracking-preferences"

interface CookieConsentManagerProps {
  children: ReactNode
}

export const CookieConsentManager: FC<
  React.PropsWithChildren<CookieConsentManagerProps>
> = ({ children }) => {
  const isMounted = useDidMount()

  const { isEigen } = useSystemContext()

  const { trackEvent } = useTracking()

  const { initialPreferences, isDisplayable } = useConsentRequired()

  const [mode, setMode] = useMode<"Idle" | "Open">("Idle")

  const handleManage = () => {
    setMode("Open")
  }

  const handleClose = () => {
    setMode("Idle")
  }

  if (!getENV("SEGMENT_WRITE_KEY")) {
    return <>{children}</>
  }

  return (
    <CookieConsentManagerProvider openConsentManager={handleManage}>
      {children}

      {isMounted && (
        <ConsentManagerBuilder
          cookieName={COOKIE_CONSENT_MANAGER_COOKIE_NAME}
          writeKey={getENV("SEGMENT_WRITE_KEY")}
          initialPreferences={initialPreferences}
          defaultDestinationBehavior="imply"
          mapCustomPreferences={mapCustomPreferences}
        >
          {({
            destinations,
            preferences,
            setPreferences,
            saveConsent,
            newDestinations,
          }) => {
            const allDestinations = [
              ...destinations,
              ...CUSTOM_DESTINATIONS,
            ].map(destination => ({
              ...destination,
              category: remapSegmentCategory(destination),
            }))

            // If there are no new destinations, we don't need to show the banner
            const isBannerDisplayable =
              !isEigen && isDisplayable && newDestinations.length > 0

            const handleAccept = () => {
              saveConsent(ALLOW_ALL_PREFERENCES)

              const payload: SavedCookieConsentPreferences = {
                action: ActionType.savedCookieConsentPreferences,
                value: ALLOW_ALL_PREFERENCES,
              }

              trackEvent(payload)
              handleClose()
            }

            return (
              <>
                {isBannerDisplayable && (
                  <CookieConsentBanner
                    onAccept={handleAccept}
                    onManage={handleManage}
                  />
                )}

                {mode !== "Idle" && (
                  <CookieConsentManagerDialog
                    destinations={allDestinations}
                    onClose={handleClose}
                    preferences={preferences}
                    saveConsent={saveConsent}
                    setPreferences={setPreferences}
                  />
                )}

                <CookieConsentManagerSetter
                  destinations={allDestinations}
                  preferences={preferences}
                />
              </>
            )
          }}
        </ConsentManagerBuilder>
      )}
    </CookieConsentManagerProvider>
  )
}
