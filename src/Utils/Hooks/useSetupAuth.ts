import { useRunAuthIntent } from "Utils/Hooks/useAuthIntent"
import { useSocialAuthTracking } from "Components/AuthDialog/Hooks/useSocialAuthTracking"
import { useAuthValidation } from "Utils/Hooks/useAuthValidation"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"

/**
 * Runs any hooks that are needed to fully
 * complete authentication (tracking, post-actions, etc.)
 */
export const useSetupAuth = () => {
  // Picks up any after auth actions that were set before authentication and runs them
  useRunAuthIntent()

  // Picks up after social authentication to track a successful login or sign up
  useSocialAuthTracking()

  // Checks to see if your current authentication is still valid and logs you out if it's not
  useAuthValidation()

  // Pre-fetches the country code for the sign up form
  useCountryCode()
}
