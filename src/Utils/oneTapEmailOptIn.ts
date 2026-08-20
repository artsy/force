const PENDING_KEY = "one-tap-welcome-email-pending"

/**
 * Records that the current session is a fresh Google One Tap sign-up. One Tap
 * has no sign-up-time consent UI (unlike the auth dialog), so we surface the
 * marketing-email opt-in on the onboarding welcome screen instead. Set when the
 * post-signup tracking cookie is read; peeked/cleared during onboarding.
 */
export const markOneTapEmailOptInPending = (): void => {
  try {
    sessionStorage.setItem(PENDING_KEY, "1")
  } catch {
    // sessionStorage can be unavailable (SSR, privacy modes); safe to ignore.
  }
}

/**
 * Returns whether a One Tap email opt-in is pending, without clearing it, so the
 * onboarding welcome screen can decide whether to render the opt-in checkbox.
 */
export const peekOneTapEmailOptInPending = (): boolean => {
  try {
    return sessionStorage.getItem(PENDING_KEY) === "1"
  } catch {
    return false
  }
}

/**
 * Clears the pending flag once the user has acted on the opt-in (or dismissed
 * the welcome screen), so it is only ever shown a single time.
 */
export const clearOneTapEmailOptInPending = (): void => {
  try {
    sessionStorage.removeItem(PENDING_KEY)
  } catch {
    // Safe to ignore — see markOneTapEmailOptInPending.
  }
}
