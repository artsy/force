import { ContextModule, Intent } from "@artsy/cohesion"
import { Button, Flex, Spacer } from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { getENV } from "Utils/getENV"
import { useEffect, useState } from "react"

export const NavBarLoggedOutActions = () => {
  const { showAuthDialog } = useAuthDialog()
  const { match } = useRouter()
  const currentPath = match.location.pathname
  const googleClientId = getENV("GOOGLE_CLIENT_ID")

  useEffect(() => {
    if (!googleClientId) {
      console.debug(
        "[OneTap] GOOGLE_CLIENT_ID not set, skipping GSI script load",
      )
      return
    }

    console.debug("[OneTap] GOOGLE_CLIENT_ID found, loading GSI script")

    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => console.debug("[OneTap] GSI script loaded")
    script.onerror = () => console.debug("[OneTap] GSI script failed to load")
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [googleClientId])

  return (
    <Flex alignItems="center">
      {googleClientId && (
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
