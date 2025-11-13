import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"

const logger = createLogger("recaptcha.ts")

export const recaptcha = async (action: RecaptchaAction): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (getENV("RECAPTCHA_KEY")) {
      window.grecaptcha?.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(
            getENV("RECAPTCHA_KEY"),
            { action }
          )

          return resolve(token)
        } catch (err) {
          logger.error(err)

          if (action === "signup_submit") {
            logger.warn("Signup submitted without Recaptcha Token")
          }

          return reject(err)
        }
      })
    } else {
      reject("`RECAPTCHA_KEY` not found")
    }
  })
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
  | "verify_user"
