import { getContextPageFromReq } from "lib/getContextPage"

export const artistMiddleware = (req, res, next) => {
  const { APP_URL, IS_MOBILE } = res.locals.sd
  if (!IS_MOBILE) {
    const { pageSlug } = getContextPageFromReq(req)

    const artistID = pageSlug
    const user = req.user && req.user.toJSON()

    // Display the signup modal on all artist pages that have the "Referrer"
    // header or direct page views, e.g. there is no Referrer.
    const referrer = req.get("Referrer")
    const isExternalReferer = !(referrer && referrer.includes(APP_URL))

    res.locals.sd.ARTIST_PAGE_CTA_ENABLED = !user && isExternalReferer
    res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID = artistID
  }

  next()
}
