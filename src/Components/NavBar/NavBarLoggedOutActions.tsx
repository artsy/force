import { ContextModule, Intent } from "@artsy/cohesion"
import { Button, Flex, Spacer } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { captureException } from "@sentry/browser"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { useEffect } from "react"

export const NavBarLoggedOutActions = () => {
  const { showAuthDialog } = useAuthDialog()
  const { match } = useRouter()
  const currentPath = match.location.pathname
  const googleClientId = getENV("GOOGLE_CLIENT_ID")
  const isGoogleOneTapEnabled = !!useFlag("diamond_google-one-tap")

  useEffect(() => {
    if (!isGoogleOneTapEnabled || !googleClientId) {
      return
    }

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onerror = () =>
      captureException(new Error("Google One Tap script failed to load"))
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [isGoogleOneTapEnabled, googleClientId])

  return (
    <Flex alignItems="center">
      {isGoogleOneTapEnabled && googleClientId && (
        <div
          id="g_id_onload"
          data-client_id={googleClientId}
          data-login_uri={`${getENV("APP_URL")}/users/auth/google/one_tap/callback`}
          data-auto_prompt="true"
        />
      )}
      <Button
        variant="secondaryBlack"
        size="small"
        onClick={() => {
          showAuthDialog({
            analytics: {
              contextModule: ContextModule.header,
              intent: Intent.login,
            },
          })
        }}
      >
        Log In
      </Button>

      <Spacer x={1} />

      <Button
        // @ts-expect-error
        as={RouterLink}
        size="small"
        to={`/signup?redirectTo=${encodeURIComponent(currentPath)}`}
      >
        Sign Up
      </Button>
    </Flex>
  )
}
