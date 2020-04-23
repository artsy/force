import { getPageType } from "../../utils/getPageType"

export const artistMiddleware = (req, res, next) => {
  const { pageType, pageParts } = getPageType(req)

  if (pageType === "artist") {
    const artistID = pageParts[2]
    const user = req.user && req.user.toJSON()
    const { APP_URL, IS_MOBILE, REFERRER } = res.locals.sd
    const isExternalReferer = !(REFERRER && REFERRER.includes(APP_URL))
    res.locals.sd.ARTIST_PAGE_CTA_ENABLED =
      !user && isExternalReferer && !IS_MOBILE
    res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID = artistID
  }
  next()
}
