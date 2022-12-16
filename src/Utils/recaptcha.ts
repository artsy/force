import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"

const logger = createLogger("recaptcha.ts")

// TODO: Should return a Promise instead of accepting a callback
export const recaptcha = (
  action: RecaptchaAction,
  callback?: RecaptchaCallback
) => {
  if (getENV("RECAPTCHA_KEY")) {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(getENV("RECAPTCHA_KEY"), {
          action,
        })

        callback?.(token)
      } catch (err) {
        logger.error(err)

        if (action === "signup_submit") {
          logger.warn("Signup submitted without Recaptcha Token")
        }

        callback?.()
      }
    })

    return
  }

  if (action === "signup_submit") {
    logger.warn("Signup submitted without Recaptcha Key")
  }

  callback?.()
}

export type RecaptchaAction =
  | "consignment_inquiry"
  | "forgot_submit"
  | "home"
  | "inquiry_forgot_impression"
  | "inquiry_impression"
  | "inquiry_login_impression"
  | "inquiry_register_impression"
  | "login_submit"
  | "signup_submit"
  | "submission_submit"

type RecaptchaCallback = (token?: string) => void
