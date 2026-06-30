import { ActionType } from "@artsy/cohesion"
import { useToasts } from "@artsy/palette"
import { useFlag, useFlagsStatus } from "@unleash/proxy-client-react"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { pathToOwnerType } from "System/Contexts/AnalyticsContext"
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

const isInputFocused = () => {
  const el = document.activeElement
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement ||
    (el instanceof HTMLElement && el.isContentEditable)
  )
}

export const GoogleOneTapContainer = () => {
  const { isLoggedIn } = useSystemContext()
  const isGoogleOneTapEnabled = !!useFlag("diamond_google-one-tap")
  const { flagsReady } = useFlagsStatus()
  const googleClientId = getENV("GOOGLE_CLIENT_ID")
  const { sendToast } = useToasts()
  const { state: authDialogState } = useAuthDialogContext()

  const enabled =
    !isLoggedIn &&
    isGoogleOneTapEnabled &&
    !!googleClientId &&
    !isAuthPath(window.location.pathname) &&
    !authDialogState.isVisible

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
    if (!flagsReady) return

    const path = window.location.pathname
    const pageParts = path.split("/")

    // We don't use hook since we don't have access to router here
    window?.analytics?.track(ActionType.experimentViewed, {
      service: "unleash",
      experiment_name: "diamond_google-one-tap",
      variant_name: isGoogleOneTapEnabled ? "experiment" : "control",
      context_owner_type: pathToOwnerType(path),
      context_owner_slug: pageParts[2],
    })
  }, [isGoogleOneTapEnabled, flagsReady])

  useEffect(() => {
    if (!authDialogState.isVisible)
      return // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).google?.accounts?.id?.cancel?.()
  }, [authDialogState.isVisible])

  useEffect(() => {
    if (!enabled) {
      return
    }

    if (document.getElementById("google-one-tap-script")) {
      return
    }

    const appendScript = () => {
      const script = document.createElement("script")
      script.id = "google-one-tap-script"
      script.src = "https://accounts.google.com/gsi/client"
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }

    if (isInputFocused()) {
      const handleFocusOut = () => {
        document.removeEventListener("focusout", handleFocusOut)
        appendScript()
      }
      document.addEventListener("focusout", handleFocusOut)
      return () => document.removeEventListener("focusout", handleFocusOut)
    }

    appendScript()
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
