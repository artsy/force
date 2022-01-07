import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import url from "url"
import express from "express"

const router = express.Router()

const to = path =>
  function (req: ArtsyRequest, res: ArtsyResponse) {
    const queryString = url.parse(req.url).search || ""
    res.redirect(301, path + queryString)
  }

// Want to permanently redirect a specific route or route pattern?
// Put em' here:

const redirects = {
  "/partners": "/galleries",
  "/gallery": "/galleries",
  "/institution": "/institutions",
  "/filter/artworks": "/collect",
  "/filter/artworks/*": "/collect",
  "/artworks": "/collect",
  "/category": "/categories",
  "/gene": "/categories",
  "/genes": "/categories",
  "/partner-application": "/apply",
  "/fair-application": "/apply/fair",
  "/fairs": "art-fairs",
  "/feature/art-fairs": "art-fairs",
  "/settings": "/user/edit",
  "/collector/edit": "/profile/edit",
  "/_=_": "/", // Facebook passport bug, see: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
  "/press": "/press/in-the-media",
  "/about/press": "/press/press-releases",
  "/about/page/press": "/press/press-releases",
  "/about/page/events": "/press/in-the-media",
  "/about/jobs": "/jobs",
  "/lama": "/auction/los-angeles-modern-auctions-march-2015", // HACK: Redirect the "auction" profile to the LAMA auction
  "/dev": "/inquiry/development",
  "/artist": "/artists",
  "/job/mobile-engineer": "/article/artsy-jobs-mobile-engineer",
  "/article/jesse-kedy-digital-marketing-manager-organic-growth-06-22-15":
    "/article/artsy-jobs-associate-director-of-organic-growth",
  "/feature/artsy-education": "/artsy-education",
  "/favorites": "/user/saves#saved-artworks",
  "/following/artists": "/user/saves#artists",
  "/following/genes": "/user/saves#categories",
  "/following/profiles": "/user/saves#galleries-institutions",
  "/artsy.net/artwork/marilyn-minter-miley": "/artwork/marilyn-minter-miley",
  "/article/artsy-editorial-the-year-in-art-2016": "/2016-year-in-art",
  "/show": "/shows",
  "/all-cities": "/shows/all-cities",
  // pre-2015 city shows routes
  "/beijing": "/shows/beijing-china",
  "/berlin": "/shows/berlin-germany",
  "/boston": "/shows/boston-ma-usa",
  "/chicago": "/shows/chicago-il-usa",
  "/hong-kong": "/shows/hong-kong-hong-kong",
  "/london": "/shows/london-united-kingdom",
  "/los-angeles": "/shows/los-angeles-ca-usa",
  "/miami": "/shows/miami-fl-usa",
  "/milan": "/shows/milan-italy",
  "/new-york": "/shows/new-york-ny-usa",
  "/paris": "/shows/paris-france",
  "/san-francisco": "/shows/san-francisco-ca-usa",
  "/santa-fe": "/shows/santa-fe-nm-usa",
  "/sao-paulo": "/shows/sao-paulo-brazil",
  "/shanghai": "/shows/shanghai-china",
  "/tokyo": "/shows/tokyo-japan",
  "/toronto": "/shows/toronto-canada",
  "/settings2": "/settings2/edit-settings",
  "/posts": "/articles",
  "/magazine": "/articles",
}

for (let from in redirects) {
  const path = redirects[from]
  router.get(from, to(path))
}

export const hardcodedRedirectsMiddleware = router
