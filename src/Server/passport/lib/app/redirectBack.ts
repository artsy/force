import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { sanitizeRedirect } from "Utils/sanitizeRedirect"

const opts = require("../options")

export const redirectBack = (
  req: ArtsyRequest & { artsyPassportSignedUp?: boolean },
  res: ArtsyResponse | null = null
) => {
  const url = sanitizeRedirect(
    req.session.redirectTo ||
      (req.artsyPassportSignedUp && !req.session.skipOnboarding
        ? opts.afterSignupPagePath
        : undefined) ||
      req.body["redirect-to"] ||
      req.query["redirect-to"] ||
      req.params.redirect_uri ||
      "/"
  )

  if (res !== null) {
    delete req.session.redirectTo
    delete req.session.skipOnboarding

    res.redirect(url)
  }

  return url
}

export default redirectBack

module.exports = redirectBack
