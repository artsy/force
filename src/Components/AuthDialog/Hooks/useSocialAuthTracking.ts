import type { AuthDialogAnalytics } from "Components/AuthDialog/AuthDialogContext"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import Cookies from "cookies-js"
import { useEffect } from "react"
import * as Yup from "yup"

const USE_SOCIAL_AUTH_TRACKING_KEY = "useSocialAuthTracking"

/**
 * Picks up on the cookie set by the passport server after social auth and fires
 * the appropriate Cohesion tracking event once the user is redirected back.
 */
export const useSocialAuthTracking = () => {
  const {
    match: { location },
  } = useRouter()

  const { user } = useSystemContext()

  const track = useAuthDialogTracking()

  useEffect(() => {
    // Skip if the user isn't logged in
    if (!user || !user.id) return

    const cookie = Cookies.get(USE_SOCIAL_AUTH_TRACKING_KEY)

    // Skip if there's no cookie
    if (!cookie) return

    const value = parse(cookie)

    // Skip if the cookie is invalid
    if (!value) {
      // Expire the cookie so we don't keep trying to parse it
      Cookies.expire(USE_SOCIAL_AUTH_TRACKING_KEY)
      console.warn('Invalid cookie found for "useSocialAuthTracking"')

      return
    }

    // Skip if the user is on an authentication route, which likely means
    // social authentication failed and returned an error
    if (["/login", "/signup"].includes(location.pathname)) {
      // Expire the cookie since authentication failed
      Cookies.expire(USE_SOCIAL_AUTH_TRACKING_KEY)

      return
    }

    const params = {
      service: value.service,
      userId: user.id,
      ...(value.method ? { method: value.method } : {}),
      ...(value.analytics ?? {}),
    }

    if (value.action === "signedUp") {
      // for social auth, tracking fires after a full-page redirect, so the
      // dialog context is gone. We read onboarding from the URL instead
      const onboarding =
        new URLSearchParams(location.search).get("onboarding") === "true"
      track.signedUp({ ...params, onboarding })
    } else {
      track.loggedIn(params)
    }

    Cookies.expire(USE_SOCIAL_AUTH_TRACKING_KEY)
  }, [location.pathname, location.search, track, user])
}

const schema = Yup.object({
  action: Yup.string().oneOf(["loggedIn", "signedUp"]).required(),
  analytics: Yup.object({
    contextModule: Yup.string(),
    intent: Yup.string(),
    trigger: Yup.string(),
  }),
  method: Yup.string().oneOf(["one-tap"]),
  service: Yup.string().oneOf(["apple", "google", "facebook"]).required(),
  trigger: Yup.string().oneOf(["click", "tap", "timed", "scroll"]),
})

type Payload = Omit<
  Yup.InferType<typeof schema>,
  "analytics" | "method" | "service"
> & {
  // We assume that the unions are valid because it would
  // be difficult to get the runtime values from Cohesion
  analytics?: AuthDialogAnalytics
  method?: "one-tap"
  service: "apple" | "facebook" | "google"
}

const isValid = (value: any): value is Payload => {
  return schema.isValidSync(value)
}

const parse = (value: any): Payload | null => {
  try {
    const parsed = JSON.parse(value)

    if (!isValid(parsed)) return null

    return parsed
  } catch (err) {
    return null
  }
}
