/**
 * Experiment with overwriting OneTrust consent cookie with server-side version
 * to get around Safari's 7 day limit for client-side cookies.
 */
export const setTrackingPreferences = (req, res) => {
  const { OptanonAlertBoxClosed, OptanonConsent } = req.query

  const cookieConfig = {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    httpOnly: false,
    secure: true,
  }

  if (OptanonAlertBoxClosed !== "undefined") {
    res.cookie("OptanonAlertBoxClosed", OptanonAlertBoxClosed, cookieConfig)
  }

  if (OptanonConsent) {
    res.cookie("OptanonConsent", OptanonConsent, cookieConfig)
  }

  res.send("[Force] Consent cookie set.")
}
