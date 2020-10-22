import Cookies from "cookies-js"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { data as sd } from "sharify"
import * as qs from "query-string"
import { Response } from "express"
import { captureException } from "@sentry/browser"
import {
  AuthService,
  createdAccount,
  resetYourPassword,
  successfullyLoggedIn,
} from "@artsy/cohesion"
import { omit } from "lodash"
import { mediator } from "lib/mediator"

const LoggedOutUser = require("desktop/models/logged_out_user.coffee")

export const handleSubmit = (
  type: ModalType,
  modalOptions: ModalOptions,
  values,
  formikBag
) => {
  const user = new LoggedOutUser()
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
    signupIntent: intent,
    signupReferer,
    agreed_to_receive_emails: values.accepted_terms_of_service,
  })

  user.set(userAttributes)

  const options = {
    success: async (_, res) => {
      formikBag.setSubmitting(false)
      const analytics = (window as any).analytics

      if (analytics) {
        let options = {
          authRedirect: redirectTo || destination,
          contextModule,
          copy,
          intent,
          service: "email" as AuthService,
          triggerSeconds,
          userId: res && res.user && res.user.id,
        }

        let analyticsOptions
        switch (type) {
          case ModalType.login:
            analyticsOptions = successfullyLoggedIn(options)
            break
          case ModalType.signup:
            analyticsOptions = createdAccount({
              onboarding: !redirectTo,
              ...options,
            })
            break
          case ModalType.forgot:
            analyticsOptions = resetYourPassword(options)
            break
        }
        analytics.track(
          analyticsOptions.action,
          omit(analyticsOptions, "action")
        )
      }

      let afterAuthURL: URL
      if (modalOptions.redirectTo) {
        afterAuthURL = new URL(modalOptions.redirectTo, sd.APP_URL)
      } else {
        afterAuthURL = getRedirect(type)
      }

      const result = await apiAuthWithRedirectUrl(res, afterAuthURL)

      window.location.assign(result.href)
    },
    error: (_, res) => {
      const error = res.responseJSON
      formikBag.setStatus(error)
      formikBag.setSubmitting(false)
      mediator.trigger("auth:error", error.message)
    },
  }

  switch (type) {
    case ModalType.login:
      user.login(options)
      break
    case ModalType.signup:
      user.signup(options)
      break
    case ModalType.forgot:
      user.forgot(options)
      break
  }
}

export const setCookies = options => {
  const { afterSignUpAction, destination } = options

  if (afterSignUpAction) {
    Cookies.set("afterSignUpAction", JSON.stringify(afterSignUpAction))
  }

  if (destination) {
    Cookies.set("destination", destination, {
      expires: 60 * 60 * 24,
    })
  }
}

export async function apiAuthWithRedirectUrl(
  response: Response,
  redirectPath: URL
): Promise<URL> {
  const redirectUrl = sd.APP_URL + redirectPath.pathname + redirectPath.search
  const accessToken = (response["user"] || {}).accessToken
  const appRedirectURL = new URL(redirectUrl)

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
    captureException(error)
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
