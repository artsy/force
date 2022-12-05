import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"
import { getENV } from "Utils/getENV"

const DEFAULT_AFTER_AUTH_REDIRECT_PATH = "/"

const GRAVITY_AUTHENTICATION_ENDPOINT = `${getENV("API_URL")}/users/sign_in`

/**
 * Returns a function that will redirect the user to the correct page
 */
export const useAfterAuthenticationRedirect = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  const { isElligibleForOnboarding } = useElligibleForOnboarding()

  const runRedirect = (trustToken?: string | null) => {
    const redirect = options.redirectTo || getDefaultRedirect()
    const redirectUrl = new URL(redirect, getENV("APP_URL"))

    if (isElligibleForOnboarding) {
      redirectUrl.searchParams.append("onboarding", "true")
    }

    // If we have a trust token; use that to log into Gravity instead.
    // Gravity will then handle the redirect after authentication.
    if (trustToken) {
      const gravityUrl = new URL(GRAVITY_AUTHENTICATION_ENDPOINT)

      gravityUrl.searchParams.append("trust_token", trustToken)
      gravityUrl.searchParams.append("redirect_uri", redirectUrl.toString())

      window.location.assign(gravityUrl.toString())

      return
    }

    // Otherwise; just redirect to the URL.
    return window.location.assign(redirectUrl.toString())
  }

  return { runRedirect }
}

const getDefaultRedirect = () => {
  const { loginPagePath, signupPagePath } = getENV("AP")

  // If we're on the login or sign up path; we should redirect to the default (index).
  // Otherwise stay on the same page.
  return [loginPagePath, signupPagePath].includes(window.location.pathname)
    ? DEFAULT_AFTER_AUTH_REDIRECT_PATH
    : window.location.href
}
