import { useFlag } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { getENV } from "Utils/getENV"
import { useEffect } from "react"

export const GoogleOneTapContainer = () => {
  const { isLoggedIn } = useSystemContext()
  const isGoogleOneTapEnabled = !!useFlag("diamond_google-one-tap")
  const googleClientId = getENV("GOOGLE_CLIENT_ID")

  const enabled = !isLoggedIn && isGoogleOneTapEnabled && !!googleClientId

  useEffect(() => {
    if (!enabled) {
      return
    }

    if (document.getElementById("google-one-tap-script")) {
      return
    }

    const script = document.createElement("script")
    script.id = "google-one-tap-script"
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    // TODO:
    // script.onerror = () =>
    //   captureException(new Error("Google One Tap script failed to load"))
    document.body.appendChild(script)
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <div
      id="g_id_onload"
      data-client_id={googleClientId}
      data-login_uri={`${getENV("APP_URL")}/users/auth/google/one_tap/callback`}
      data-auto_prompt="true"
    />
  )
}
