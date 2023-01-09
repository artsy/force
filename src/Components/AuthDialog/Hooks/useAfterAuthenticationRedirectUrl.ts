import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"
import { useMemo } from "react"
import { getENV } from "Utils/getENV"

/**
 * Returns a string representing the URL to redirect to after authentication.
 */
export const useAfterAuthenticationRedirectUrl = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  const { isElligibleForOnboarding } = useElligibleForOnboarding()

  const redirectUrl = useMemo(() => {
    const redirect = options.redirectTo || getDefaultRedirect()
    const redirectUri = new URL(redirect, getENV("APP_URL"))

    if (isElligibleForOnboarding) {
      redirectUri.searchParams.append("onboarding", "true")
    }

    // Validate that it's a safe URL to redirect to.
    if (
      !(
        redirectUri.origin === getENV("APP_URL") ||
        redirectUri.origin === getENV("API_URL") ||
        redirectUri.hostname === "localhost"
      )
    ) {
      return DEFAULT_AFTER_AUTH_REDIRECT_PATH
    }

    return redirectUri.toString()
  }, [isElligibleForOnboarding, options.redirectTo])

  return { redirectUrl }
}

const getDefaultRedirect = () => {
  const { loginPagePath, signupPagePath } = getENV("AP")

  // If we're on the login or sign up path; we should redirect to the default (index).
  // Otherwise stay on the same page.
  return [loginPagePath, signupPagePath].includes(window.location.pathname)
    ? DEFAULT_AFTER_AUTH_REDIRECT_PATH
    : window.location.href
}

const DEFAULT_AFTER_AUTH_REDIRECT_PATH = "/"
