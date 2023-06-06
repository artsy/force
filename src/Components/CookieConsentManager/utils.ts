import cookies from "cookies-js"
import { COOKIE_CONSENT_MANAGER_COOKIE_NAME } from "Components/CookieConsentManager/CookieConsentManager"

export const setServerSideCookie = () => {
  // Wait for cookie to be set
  setTimeout(() => {
    const cookie = cookies.get(COOKIE_CONSENT_MANAGER_COOKIE_NAME)

    if (!cookie) return

    const trackingPreferences = encodeURIComponent(cookie)

    fetch(
      `/set-tracking-preferences?${COOKIE_CONSENT_MANAGER_COOKIE_NAME}=${trackingPreferences}`
    )
  }, 0)
}
