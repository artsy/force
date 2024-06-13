import { FC, ReactNode } from "react"
import { ConsentManagerBuilder } from "@segment/consent-manager"
import { getENV } from "Utils/getENV"
import { useDidMount } from "@artsy/palette"
import {
  CUSTOM_DESTINATIONS,
  ALLOW_ALL_PREFERENCES,
  mapCustomPreferences,
  remapSegmentCategory,
} from "Components/CookieConsentManager/categories"
import { useMode } from "Utils/Hooks/useMode"
import { CookieConsentBanner } from "Components/CookieConsentManager/CookieConsentBanner"
import { useConsentRequired } from "Components/CookieConsentManager/useConsentRequired"
import { useTracking } from "react-tracking"
import { CookieConsentManagerDialog } from "Components/CookieConsentManager/CookieConsentManagerDialog"
import { CookieConsentManagerProvider } from "Components/CookieConsentManager/CookieConsentManagerContext"
import { CookieConsentManagerSetter } from "Components/CookieConsentManager/CookieConsentManagerSetter"
import { SavedCookieConsentPreferences } from "@artsy/cohesion/dist/Schema/Events/CookieConsent"
import { ActionType } from "@artsy/cohesion"
import { useSystemContext } from "System/Hooks/useSystemContext"

export const COOKIE_CONSENT_MANAGER_COOKIE_NAME = "tracking-preferences"

interface CookieConsentManagerProps {
  children: ReactNode
}

export const CookieConsentManager: FC<CookieConsentManagerProps> = ({
  children,
}) => {
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
