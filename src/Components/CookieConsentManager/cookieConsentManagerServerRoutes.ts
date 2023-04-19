import { COOKIE_CONSENT_MANAGER_COOKIE_NAME } from "Components/CookieConsentManager/CookieConsentManager"
import { Router } from "express"
import { ArtsyRequest } from "Server/middleware/artsyExpress"

const COOKIE_CONFIGURATION = {
  maxAge: 1000 * 60 * 60 * 24 * 365,
  httpOnly: false,
  secure: true,
}

const cookieConsentManagerServerRoutes = Router()

cookieConsentManagerServerRoutes.get(
  // Works around Safari's 7 day limit for client-side cookies
  "/set-tracking-preferences",
  (req: ArtsyRequest, res) => {
    const trackingPreferences = req.query[COOKIE_CONSENT_MANAGER_COOKIE_NAME]

    if (trackingPreferences) {
      res.cookie(
        COOKIE_CONSENT_MANAGER_COOKIE_NAME,
        trackingPreferences,
        COOKIE_CONFIGURATION
      )
    }

    res.send("[Force] Consent cookie set.")
  }
)

export { cookieConsentManagerServerRoutes }
