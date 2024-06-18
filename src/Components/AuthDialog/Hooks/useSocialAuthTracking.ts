import * as Yup from "yup"
import Cookies from "cookies-js"
import { useAuthDialogTracking } from "Components/AuthDialog/Hooks/useAuthDialogTracking"
import { useEffect } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { AuthDialogAnalytics } from "Components/AuthDialog/AuthDialogContext"

const USE_SOCIAL_AUTH_TRACKING_KEY = "useSocialAuthTracking"

/**
 * Picks up on the cookie set by `setSocialAuthTracking` and logs
 * the appropriate event once the user is redirected back to the app successfully.
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

    track[value.action]({
      service: value.service,
      userId: user.id,
      ...value.analytics,
    })

    Cookies.expire(USE_SOCIAL_AUTH_TRACKING_KEY)
  }, [location.pathname, track, user])
}

const schema = Yup.object({
  action: Yup.string().oneOf(["loggedIn", "signedUp"]).required(),
  analytics: Yup.object({
    contextModule: Yup.string().required(),
    intent: Yup.string(),
    trigger: Yup.string(),
  }),
  service: Yup.string().oneOf(["apple", "google", "facebook"]).required(),
})

type Payload = Omit<Yup.InferType<typeof schema>, "analytics"> & {
  // We assume that the unions are valid because it would
  // be difficult to get the runtime values from Cohesion
  analytics: AuthDialogAnalytics
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

export const setSocialAuthTracking = (payload: Payload) => {
  Cookies.set(USE_SOCIAL_AUTH_TRACKING_KEY, JSON.stringify(payload))
}
