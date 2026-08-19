const PENDING_KEY = "one-tap-welcome-email-pending"

/**
 * Records that the current session is a fresh Google One Tap sign-up, so the
 * welcome/email opt-in modal can be shown once onboarding is dismissed. Set
 * when the post-signup tracking cookie is read; consumed at onboarding close.
 */
export const markOneTapWelcomeEmailPending = (): void => {
  try {
    sessionStorage.setItem(PENDING_KEY, "1")
  } catch {
    // sessionStorage can be unavailable (SSR, privacy modes); safe to ignore.
  }
}

/**
 * Returns true exactly once if a pending One Tap welcome modal was recorded,
 * clearing the flag so the modal is only ever shown a single time.
 */
export const consumeOneTapWelcomeEmailPending = (): boolean => {
  try {
    if (sessionStorage.getItem(PENDING_KEY) !== "1") {
      return false
    }

    sessionStorage.removeItem(PENDING_KEY)
    return true
  } catch {
    return false
  }
}
