import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { useMemo } from "react"

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
      getENV("APP_URL") ?? "https://www.artsy.net",
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
  const location = router.match ? router.match.location : window.location

  // Read redirectTo from URL query params (for client-side navigation)
  let redirectTo: string | null = null
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search)
    redirectTo = params.get("redirectTo")
  }

  const defaultRedirect = (() => {
    // Use redirectTo from URL if available
    if (redirectTo) {
      return redirectTo
    }

    // Otherwise use default logic
    return ["/login", "/signup"].includes(location.pathname)
      ? DEFAULT_AFTER_AUTH_REDIRECT_PATH
      : location.pathname + (location.search || "")
  })()

  return { defaultRedirect }
}

const DEFAULT_AFTER_AUTH_REDIRECT_PATH = "/"
