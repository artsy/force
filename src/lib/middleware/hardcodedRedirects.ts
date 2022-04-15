import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import url from "url"
import express from "express"

// Permanently (301) redirect a specific route or route pattern?
const REDIRECTS = {
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
  "/collector/edit": "/profile/edit",
  "/how-auctions-work":
    "https://support.artsy.net/hc/en-us/articles/4419870291351-The-Complete-Guide-to-Auctions-on-Artsy",
  "/_=_": "/", // Facebook passport bug, see: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
  "/press": "/press/in-the-media",
  "/about/press": "/press/press-releases",
  "/about/page/press": "/press/press-releases",
  "/about/page/events": "/press/in-the-media",
  "/about/jobs": "/jobs",
  "/lama": "/auction/los-angeles-modern-auctions-march-2015", // HACK: Redirect the "auction" profile to the LAMA auction
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
  "/posts": "/articles",
  "/magazine": "/articles",
  "/settings": "/settings/edit-settings",
  "/profile/edit": "/settings/edit-profile",
  "/user/edit": "/settings/edit-settings",
  "/user/delete": "/settings/delete",
  "/user/saves": "/settings/saves",
  "/user/auctions": "/settings/auctions",
  "/user/shipping": "/settings/shipping",
  "/user/purchases": "/settings/purchases",
  "/user/payments": "/settings/payments",
  "/user/alerts": "/settings/alerts",
  "/page/collector-faqs-selling-on-artsy": "/consign",
  "/apply/gallery": "http://apply.artsy.net/galleries",
  "/apply/institution": "http://apply.artsy.net/institutions",
  "/apply/auction": "http://apply.artsy.net/auctions",
  "/apply/fair": "http://apply.artsy.net/fairs",
  "/apply*": "http://apply.artsy.net/partnerships",
  "/gallery-partnerships": "https://partners.artsy.net",
  "/artsy-in-miami": "/fairs",
  "/armory-week": "/fairs",
  "/spring-art-fairs": "/fairs",
  "/london-art-fair-week": "/fairs",
  "/basel-art-week": "/fairs",
  "/life-at-artsy": "/channel/life-at-artsy",
  "/artsy-education": "/channel/artsy-education",
  "/buying-with-artsy": "/channel/buying-with-artsy",
  "/personalize": "/",
  "/personalize/*": "/",
}

const router = express.Router()

for (let from in REDIRECTS) {
  const path = REDIRECTS[from]

  router.get(from, (req: ArtsyRequest, res: ArtsyResponse) => {
    const queryString = url.parse(req.url).search || ""

    res.redirect(301, path + queryString)
  })
}

export const hardcodedRedirectsMiddleware = router
