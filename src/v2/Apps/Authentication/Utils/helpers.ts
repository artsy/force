import Cookies from "cookies-js"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { data as sd } from "sharify"
import * as qs from "query-string"
import type { Response } from "express"
import {
  AuthService,
  CreatedAccount,
  SuccessfullyLoggedIn,
  ResetYourPassword,
  ActionType,
  AuthModalType,
  AuthTrigger,
  AuthContextModule,
} from "@artsy/cohesion"
import { pick } from "lodash"
import { mediator } from "lib/mediator"
import { reportError } from "v2/Utils/errors"
import { trackEvent } from "lib/analytics/helpers"
import { getENV } from "v2/Utils/getENV"

interface AnalyticsOptions {
  auth_redirect: string
  context_module: AuthContextModule
  modal_copy
  intent
  trigger_seconds?: number
  trigger: AuthTrigger
  service: AuthService
}

export const handleSubmit = async (
  type: ModalType,
  modalOptions: ModalOptions,
  values,
  formikBag
) => {
  const {
    contextModule,
    copy,
    destination,
    redirectTo,
    intent,
    signupReferer,
    triggerSeconds,
  } = modalOptions

  /*
   * These are the attributes that will be saved on the user. We are moving
   * towards using `intent` on analytics, but Gravity expects `signupIntent`
   */
  const userAttributes = Object.assign({}, values, {
    _csrf: Cookies && Cookies.get && Cookies.get("CSRF_TOKEN"),
    session_id: sd.SESSION_ID,
    signupIntent: intent,
    signupReferer,
    agreed_to_receive_emails: values.agreed_to_receive_emails,
  })

  const options = {
    success: async res => {
      formikBag.setSubmitting(false)
      const analytics = (window as any).analytics

      if (analytics) {
        const options: AnalyticsOptions = {
          auth_redirect: redirectTo || destination!,
          context_module: contextModule!,
          modal_copy: copy,
          intent,
          trigger_seconds: triggerSeconds,
          trigger: "timed",
          service: "email",
        }

        let analyticsOptions
        switch (type) {
          case ModalType.login:
            analyticsOptions = tracks.successfullyLoggedIn(
              options,
              res?.user?.id
            )
            break
          case ModalType.signup:
            analyticsOptions = tracks.createdAccount(
              options,
              res?.user?.id,
              !redirectTo
            )
            break
          case ModalType.forgot:
            analyticsOptions = tracks.resetYourPassword(options)
            break
        }
        trackEvent(analyticsOptions)
      }

      let afterAuthURL: URL
      if (modalOptions.redirectTo) {
        afterAuthURL = new URL(modalOptions.redirectTo, sd.APP_URL)
      } else {
        afterAuthURL = getRedirect(type)
      }

      const result = await apiAuthWithRedirectUrl(res, afterAuthURL)

      if (result.origin === getENV("APP_URL")) {
        window.location.assign(result.href)
      }

      window.location.assign(
        `/auth-redirect?redirectTo=${encodeURIComponent(result.href)}`
      )
    },
    error: error => {
      formikBag.setStatus(error)
      formikBag.setSubmitting(false)
      mediator.trigger("auth:error", error.message)
    },
  }

  switch (type) {
    case ModalType.login:
      await loginUser(userAttributes, options)
      break
    case ModalType.signup:
      await signupUser(userAttributes, options)
      break
    case ModalType.forgot:
      await forgotUserPassword(userAttributes, options)
      break
  }
}

export const setCookies = options => {
  const { afterSignUpAction, destination, submissionId } = options

  console.log({ options })

  if (afterSignUpAction) {
    Cookies.set("afterSignUpAction", JSON.stringify(afterSignUpAction))
  }

  if (destination) {
    Cookies.set("destination", destination, {
      expires: 60 * 60 * 24,
    })
  }

  if (submissionId) {
    Cookies.set("submissionId", submissionId, {
      expires: 60 * 60 * 24,
    })
  }
}

export async function apiAuthWithRedirectUrl(
  response: Response,
  redirectPath: URL
): Promise<URL> {
  const accessToken = (response["user"] || {}).accessToken

  const appRedirectURL = redirectPath

  // There isn't an access token when we don't have a valid session, for example,
  // when the user is resetting their password.
  if (!accessToken) return appRedirectURL

  try {
    const tokenResponse = await fetch(sd.API_URL + "/api/v1/me/trust_token", {
      method: "POST",
      headers: { "X-Access-Token": accessToken },
    })

    if (tokenResponse.ok) {
      const responseBody = await tokenResponse.json()
      const trustToken = responseBody["trust_token"]

      const queryParams = qs.stringify({
        trust_token: trustToken,
        redirect_uri: appRedirectURL.toString(),
      })
      return new URL(`${sd.API_URL}/users/sign_in?${queryParams}`)
    } else {
      return appRedirectURL
    }
  } catch (error) {
    reportError(error)
    return appRedirectURL
  }
}

export function getRedirect(type): URL {
  const appBaseURL = new URL(sd.APP_URL)
  const { location } = window

  switch (type) {
    case "login":
    case "forgot":
      if (["/login", "/forgot"].includes(location.pathname)) {
        return new URL("/", appBaseURL)
      } else {
        return new URL(location.href, appBaseURL)
      }
    case "signup":
      return new URL("/personalize", appBaseURL)
    default:
      return new URL(window.location.href, appBaseURL)
  }
}

const loginUser = async (
  userAttributes: object,
  options: {
    success: (res: any) => Promise<void>
    error: (err: any) => void
  }
) => {
  const url = `${sd.APP_URL}${sd.AP.loginPagePath}`
  const user = pick(userAttributes, [
    "email",
    "password",
    "otp_attempt",
    "session_id",
    "_csrf",
    "otpRequired",
  ])

  await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(async data => {
      if (data.success) {
        await options.success(data)
      } else {
        options.error(data)
      }
    })
    .catch(e => reportError(e))
}

const signupUser = async (
  userAttributes: object,
  options: {
    success: (res: any) => Promise<void>
    error: (err: any) => void
  }
) => {
  const url = `${sd.APP_URL}${sd.AP.signupPagePath}`
  const user = pick(userAttributes, [
    "name",
    "email",
    "password",
    "_csrf",
    "session_id",
    "signupIntent",
    "signupReferer",
    "accepted_terms_of_service",
    "agreed_to_receive_emails",
    "recaptcha_token",
  ])

  await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(async data => {
      if (data.success) {
        await options.success(data)
      } else {
        options.error(data)
      }
    })
    .catch(e => reportError(e))
}

const forgotUserPassword = async (
  userAttributes: object,
  options: {
    success: (res: any) => Promise<void>
    error: (err: any) => void
  }
) => {
  const url = `${sd.API_URL}/api/v1/users/send_reset_password_instructions`
  const reset_password_redirect_to = sd.RESET_PASSWORD_REDIRECT_TO || null
  const mode =
    sd.SET_PASSWORD === "true" ? "fair_set_password" : sd.SET_PASSWORD || null

  let user = pick(userAttributes, ["email", "session_id"])
  user = {
    reset_password_redirect_to,
    mode,
    ...user,
  }
  await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
    },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(async data => {
      if (data.status === "success") {
        await options.success(data)
      } else {
        options.error(data)
      }
    })
    .catch(e => reportError(e))
}

const tracks = {
  resetYourPassword: (options: AnalyticsOptions): ResetYourPassword => ({
    action: ActionType.resetYourPassword,
    type: AuthModalType.forgot,
    ...options,
  }),
  successfullyLoggedIn: (
    options: AnalyticsOptions,
    userId: string
  ): SuccessfullyLoggedIn => ({
    action: ActionType.successfullyLoggedIn,
    type: AuthModalType.login,
    user_id: userId,
    ...options,
  }),
  createdAccount: (
    options: AnalyticsOptions,
    userId: string,
    onboarding: boolean
  ): CreatedAccount => ({
    action: ActionType.createdAccount,
    type: AuthModalType.signup,
    user_id: userId,
    onboarding,
    ...options,
  }),
}
