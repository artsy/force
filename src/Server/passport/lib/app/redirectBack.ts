import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import { sanitizeRedirect } from "Utils/sanitizeRedirect"
import opts from "../options"

export const redirectBack = (
  req: ArtsyRequest & { artsyPassportSignedUp?: boolean },
  res: ArtsyResponse | null = null,
) => {
  let url = sanitizeRedirect(
    req.session.redirectTo ||
      (req.artsyPassportSignedUp && !req.session.skipOnboarding
        ? opts.afterSignupPagePath
        : undefined) ||
      req.body["redirect-to"] ||
      req.query["redirect-to"] ||
      req.params.redirect_uri ||
      "/",
  )

  // If this is a new social auth signup, append onboarding=true
  if (req.artsyPassportSignedUp && !req.session.skipOnboarding) {
    const separator = url.includes("?") ? "&" : "?"
    url = `${url}${separator}onboarding=true`
  }

  if (res !== null) {
    delete req.session.redirectTo
    delete req.session.skipOnboarding

    res.redirect(url)
  }

  return url
}

export default redirectBack

module.exports = redirectBack
