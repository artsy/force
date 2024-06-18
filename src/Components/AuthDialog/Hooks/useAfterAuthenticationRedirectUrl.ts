import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"
import { useMemo } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"

/**
 * Returns a string representing the URL to redirect to after authentication.
 */
export const useAfterAuthenticationRedirectUrl = () => {
  const {
    state: { options },
  } = useAuthDialogContext()

  const { isElligibleForOnboarding } = useElligibleForOnboarding()

  const { defaultRedirect } = useDefaultRedirect()

  const redirectUrl = useMemo(() => {
    const redirect = options.redirectTo || defaultRedirect

    const redirectUri = new URL(
      redirect,
      getENV("APP_URL") ?? "https://www.artsy.net"
    )

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
  }, [defaultRedirect, isElligibleForOnboarding, options.redirectTo])

  return { redirectUrl }
}

const useDefaultRedirect = () => {
  const router = useRouter()

  // In a client-side context we have the window.location object, but we won't have
  // the router context. In a server-side context we have the router context,
  // but we won't have the window.location object.
  const location = router.match ? router.match.location : window.location

  // If we're on the login or sign up path; we should redirect to the default (index).
  // Otherwise stay on the same page.
  const defaultRedirect = ["/login", "/signup"].includes(location.pathname)
    ? DEFAULT_AFTER_AUTH_REDIRECT_PATH
    : location.pathname + (location.search || "")

  return { defaultRedirect }
}

const DEFAULT_AFTER_AUTH_REDIRECT_PATH = "/"
