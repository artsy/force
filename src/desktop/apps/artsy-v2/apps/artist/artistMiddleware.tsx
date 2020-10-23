import { OwnerType } from "@artsy/cohesion"
import { getContextPageFromReq } from "lib/getContextPage"

export const artistMiddleware = (req, res, next) => {
  const { pageType, pageSlug } = getContextPageFromReq(req)

  if (pageType === OwnerType.artist) {
    const artistID = pageSlug
    const user = req.user && req.user.toJSON()
    const { APP_URL, IS_MOBILE, REFERRER } = res.locals.sd
    const isExternalReferer = !(REFERRER && REFERRER.includes(APP_URL))
    res.locals.sd.ARTIST_PAGE_CTA_ENABLED =
      !user && isExternalReferer && !IS_MOBILE
    res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID = artistID
  }
  next()
}
