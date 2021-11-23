// Modernized version of src/desktop/apps/authentication/helpers.ts
// - Wraps auth related functions in consistent Promise interface
// - Automatically handles CSRF token, session ID, ReCaptcha token

import { data as sd } from "sharify"
import Cookies from "cookies-js"
import { recaptcha as _recaptcha } from "v2/Utils/recaptcha"

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
  const loginUrl = `${sd.APP_URL}${sd.AP.loginPagePath}`

  const response = await fetch(loginUrl, {
    headers,
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      email: args.email,
      password: args.password,
      otp_attempt: args.authenticationCode.replace(/ /g, ""),
      otpRequired: !!args.authenticationCode,
      session_id: sd.SESSION_ID,
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
  const forgotPasswordUrl = `${sd.API_URL}/api/v1/users/send_reset_password_instructions`

  const response = await fetch(forgotPasswordUrl, {
    headers: { ...headers, "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ email: args.email, session_id: sd.SESSION_ID }),
  })

  if (response.ok) {
    return await response.json()
  }

  const err = await response.text()
  return await Promise.reject(new Error(err))
}

/**
 * Requires a password reset token (see: `forgotPassword`) to update
 */
export const resetPassword = async (args: {
  resetPasswordToken: string
  password: string
  passwordConfirmation: string
}) => {
  const resetPasswordUrl = `${sd.API_URL}/api/v1/users/reset_password`

  const response = await fetch(resetPasswordUrl, {
    headers: { ...headers, "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN },
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

// TODO: Handle recaptcha impressions
const recaptcha = () => {
  return new Promise(resolve => _recaptcha("signup_submit", resolve))
}

/**
 * To use ensure that `EnableRecaptcha` is included somewhere on your page
 */
export const signUp = async (args: {
  name: string
  email: string
  password: string
}) => {
  const signUpUrl = `${sd.APP_URL}${sd.AP.signupPagePath}`

  const recaptchaToken = await recaptcha()

  return await fetch(signUpUrl, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      name: args.name,
      email: args.email,
      password: args.password,
      session_id: sd.SESSION_ID,
      _csrf: Cookies.get("CSRF_TOKEN"),
      accepted_terms_of_service: true,
      recaptcha_token: recaptchaToken,
    }),
  }).then(async response => {
    if (response.ok) {
      return await response.json()
    }

    const err = await response.json()
    return Promise.reject(new Error(err.error))
  })
}
