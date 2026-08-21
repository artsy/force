// One Tap has no consent UI at sign-up, so we flag the fresh sign-up here and
// carry it to the onboarding welcome screen where the opt-in is shown.
const PENDING_KEY = "one-tap-welcome-email-pending"

export const markOneTapEmailOptInPending = (): void => {
  try {
    sessionStorage.setItem(PENDING_KEY, "1")
  } catch {
    // sessionStorage can be unavailable (SSR, privacy modes).
  }
}

export const peekOneTapEmailOptInPending = (): boolean => {
  try {
    return sessionStorage.getItem(PENDING_KEY) === "1"
  } catch {
    return false
  }
}

export const clearOneTapEmailOptInPending = (): void => {
  try {
    sessionStorage.removeItem(PENDING_KEY)
  } catch {
    // sessionStorage can be unavailable (SSR, privacy modes).
  }
}
