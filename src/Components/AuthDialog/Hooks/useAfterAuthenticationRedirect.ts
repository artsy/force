import { useAfterAuthenticationRedirectUrl } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirectUrl"
import { getENV } from "Utils/getENV"

const GRAVITY_AUTHENTICATION_ENDPOINT = `${getENV("API_URL")}/users/sign_in`

/**
 * Returns a function that will redirect the user to the correct page
 */
export const useAfterAuthenticationRedirect = () => {
  const { redirectUrl } = useAfterAuthenticationRedirectUrl()

  const runRedirect = (trustToken?: string | null) => {
    // If we have a trust token; use that to log into Gravity instead.
    // Gravity will then handle the redirect after authentication.
    if (trustToken) {
      const gravityUrl = new URL(GRAVITY_AUTHENTICATION_ENDPOINT)

      gravityUrl.searchParams.append("trust_token", trustToken)
      gravityUrl.searchParams.append("redirect_uri", redirectUrl)

      window.location.assign(gravityUrl.toString())

      return
    }

    // Otherwise; just redirect to the URL.
    return window.location.assign(redirectUrl)
  }

  return { runRedirect }
}
