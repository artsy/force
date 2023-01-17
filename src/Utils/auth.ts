// Modernized version of src/desktop/apps/authentication/helpers.ts
// - Wraps auth related functions in consistent Promise interface
// - Automatically handles CSRF token, session ID, reCAPTCHA token

import Cookies from "cookies-js"
import { getENV } from "Utils/getENV"
import { recaptcha as _recaptcha, RecaptchaAction } from "Utils/recaptcha"

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
}

export const login = async (args: {
  email: string
  password: string
  authenticationCode: string
}) => {
  recaptcha("login_submit")

  const loginUrl = `${getENV("APP_URL")}${getENV("AP").loginPagePath}`

  const response = await fetch(loginUrl, {
    headers,
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      email: args.email,
      password: args.password,
      otp_attempt: args.authenticationCode.replace(/ /g, ""),
      otpRequired: !!args.authenticationCode,
      session_id: getENV("SESSION_ID"),
      _csrf: Cookies.get("CSRF_TOKEN"),
    }),
  })

  if (response.ok) {
    const res = await response.json()

    if (res.success) {
      return res
    }

    return Promise.reject(new Error(res.error))
  }

  const err = await response.json()
  return await Promise.reject(new Error(err.error))
}

/**
 * Triggers a password reset (sends an email with password reset instructions)
 */
export const forgotPassword = async (args: { email: string }) => {
  recaptcha("forgot_submit")

  const forgotPasswordUrl = `${getENV(
    "API_URL"
  )}/api/v1/users/send_reset_password_instructions`

  const response = await fetch(forgotPasswordUrl, {
    headers: { ...headers, "X-XAPP-TOKEN": getENV("ARTSY_XAPP_TOKEN") },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      email: args.email,
      session_id: getENV("SESSION_ID"),
    }),
  })

  if (response.ok) {
    return await response.json()
  }

  const err = await response.text()

  try {
    return Promise.reject(new Error(JSON.parse(err).error))
  } catch {
    return Promise.reject(new Error(err))
  }
}

/**
 * Requires a password reset token (see: `forgotPassword`) to update
 */
export const resetPassword = async (args: {
  resetPasswordToken: string
  password: string
  passwordConfirmation: string
}) => {
  const resetPasswordUrl = `${getENV("API_URL")}/api/v1/users/reset_password`

  const response = await fetch(resetPasswordUrl, {
    headers: { ...headers, "X-XAPP-TOKEN": getENV("ARTSY_XAPP_TOKEN") },
    method: "PUT",
    credentials: "same-origin",
    body: JSON.stringify({
      password: args.password,
      password_confirmation: args.passwordConfirmation,
      reset_password_token: args.resetPasswordToken,
    }),
  })

  if (response.ok) {
    return await response.json()
  }

  const err = await response.json()

  if ("error" in err) {
    return await Promise.reject({ message: err.error })
  }

  if ("message" in err) {
    return await Promise.reject({ message: err.message })
  }

  return await Promise.reject(new Error(JSON.stringify(err)))
}

const recaptcha = (action: RecaptchaAction) => {
  return new Promise(resolve => _recaptcha(action, resolve))
}

/**
 * To use ensure that `EnableRecaptcha` is included somewhere on your page
 */
export const signUp = async (args: {
  name: string
  email: string
  password: string
  agreedToReceiveEmails?: boolean
}) => {
  const signUpUrl = `${getENV("APP_URL")}${getENV("AP").signupPagePath}`

  const recaptchaToken = await recaptcha("signup_submit")

  return await fetch(signUpUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      _csrf: Cookies.get("CSRF_TOKEN"),
      agreed_to_receive_emails: args.agreedToReceiveEmails,
      accepted_terms_of_service: true,
      email: args.email,
      name: args.name,
      password: args.password,
      recaptcha_token: recaptchaToken,
      session_id: getENV("SESSION_ID"),
    }),
  }).then(async response => {
    if (response.ok) {
      return await response.json()
    }

    const err = await response.json()
    return Promise.reject(new Error(err.error))
  })
}

export const logout = async () => {
  const logoutUrl = `${getENV("APP_URL")}${getENV("AP").logoutPath}`

  const response = await fetch(logoutUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "DELETE",
    credentials: "same-origin",
  })

  if (response.ok) {
    return await response.json()
  }

  const err = await response.json()
  return Promise.reject(new Error(err.error))
}

/**
 * Returns a token used to authenticate with Gravity
 */
export const getTrustToken = async (accessToken: string): Promise<string> => {
  const response = await fetch(`${getENV("API_URL")}/api/v1/me/trust_token`, {
    method: "POST",
    headers: { "X-Access-Token": accessToken },
  })

  if (response.ok) {
    const body = await response.json()
    return body.trust_token
  }

  const err = await response.json()
  return Promise.reject(new Error(err.error))
}
