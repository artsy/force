import Cookies from "cookies-js"
import {
  ModalType,
  ModalOptions,
} from "reaction/Components/Authentication/Types"
import { data as sd } from "sharify"
import { pickBy, identity } from "lodash"
import * as qs from "query-string"
import { Response } from "express"
import { captureException } from "@sentry/browser"

const mediator = require("../../lib/mediator.coffee")
const LoggedOutUser = require("../../models/logged_out_user.coffee")

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
    trigger,
    triggerSeconds,
  } = modalOptions

  /*
   * These are the attributes that will be saved on the user. We are moving
   * towards using `intent` on analytics, but Gravity expects `signupIntent`
   */
  const userAttributes = Object.assign({}, values, {
    _csrf: sd.CSRF_TOKEN,
    signupIntent: intent,
    signupReferer,
    agreed_to_receive_emails: values.accepted_terms_of_service,
  })

  user.set(userAttributes)

  const options = {
    success: async (_, res) => {
      formikBag.setSubmitting(false)
      const analytics = (window as any).analytics

      let action
      switch (type) {
        case ModalType.login:
          action = "Successfully logged in"
          break
        case ModalType.signup:
          action = "Created account"
          break
        case ModalType.forgot:
          action = "Forgot Password"
          break
      }

      if (analytics) {
        const properties = {
          action,
          user_id: res && res.user && res.user.id,
          trigger,
          trigger_seconds: triggerSeconds,
          intent,
          type,
          context_module: contextModule,
          modal_copy: copy,
          auth_redirect: redirectTo || destination,
          service: "email",
        }
        analytics.track(action, pickBy(properties, identity))
      }

      let afterAuthURL: URL
      if (modalOptions.redirectTo) {
        afterAuthURL = new URL(modalOptions.redirectTo, sd.APP_URL)
      } else {
        afterAuthURL = getRedirect(type)
      }

      const result = await apiAuthWithRedirectUrl(res, afterAuthURL)

      window.location.href = result.href
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
  const redirectUrl = sd.APP_URL + redirectPath.pathname
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
