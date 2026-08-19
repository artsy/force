import { useDidMount, useToasts } from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
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
  const googleClientId = getENV("GOOGLE_CLIENT_ID")
  const { sendToast } = useToasts()
  const { state: authDialogState } = useAuthDialogContext()

  // `useDidMount` is false during SSR and during the client's first render
  // pass, only flipping to true after that first pass commits. This keeps
  // `enabled` in sync between the server and the client's first paint, avoiding
  // a hydration mismatch.
  const isMounted = useDidMount()

  const enabled =
    isMounted &&
    !isLoggedIn &&
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
