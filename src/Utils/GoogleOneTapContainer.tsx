import { useToasts } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { AUTH_ERROR_CODES } from "Utils/authConstants"
import { getENV } from "Utils/getENV"
import { useEffect } from "react"

const AUTH_PATHS = [
  "/log_in",
  "/sign_up",
  "/login",
  "/signup",
  "/forgot",
  "/reset_password",
  "/auth-redirect",
]

const isAuthPath = (pathname: string) =>
  AUTH_PATHS.some(path => pathname.startsWith(path))

export const GoogleOneTapContainer = () => {
  const { isLoggedIn } = useSystemContext()
  const isGoogleOneTapEnabled = !!useFlag("diamond_google-one-tap")
  const googleClientId = getENV("GOOGLE_CLIENT_ID")
  const { sendToast } = useToasts()

  const enabled =
    !isLoggedIn &&
    isGoogleOneTapEnabled &&
    !!googleClientId &&
    !isAuthPath(window.location.pathname)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const errorCode = params.get("g_one_tap_error")

    if (!errorCode) return

    const template = AUTH_ERROR_CODES[errorCode] ?? AUTH_ERROR_CODES.UNKNOWN
    const message = template.replace("{provider}", "Google")

    sendToast({ message, variant: "error", ttl: Number.POSITIVE_INFINITY })

    const cleanUrl = new URL(window.location.href)
    cleanUrl.searchParams.delete("g_one_tap_error")
    window.history.replaceState({}, "", cleanUrl.toString())
  }, [sendToast])

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
      data-skip_prompt_cookie="g_one_tap_suppress"
    />
  )
}
