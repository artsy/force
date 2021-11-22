import { data as sd } from "sharify"
import createLogger from "v2/Utils/logger"

const logger = createLogger("recaptcha.ts")

export const recaptcha = (action: RecaptchaAction, cb?: any) => {
  if (sd.RECAPTCHA_KEY) {
    window.grecaptcha?.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(sd.RECAPTCHA_KEY, {
          action,
        })
        cb && cb(token)
      } catch (e) {
        logger.error(e)
        if (action === "signup_submit") {
          logger.warn("Signup submitted without Recaptcha Token")
        }
        cb?.()
      }
    })
  } else {
    if (action === "signup_submit") {
      logger.warn("Signup submitted without Recaptcha Key")
    }
    cb?.()
  }
}

export type RecaptchaAction =
  | "forgot_submit"
  | "home"
  | "inquiry_forgot_impression"
  | "inquiry_impression"
  | "inquiry_login_impression"
  | "inquiry_register_impression"
  | "login_submit"
  | "signup_submit"
  | "submission_submit"
