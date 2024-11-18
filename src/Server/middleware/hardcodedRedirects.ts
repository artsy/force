import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import url from "url"
import express from "express"

// Permanently (301) redirect a specific route or route pattern
const PERMANENT_REDIRECTS = {
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
    "https://support.artsy.net/s/article/The-Complete-Guide-to-Auctions-on-Artsy",
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
  "/settings": "/settings/edit-profile",
  "/profile/edit": "/settings/edit-profile",
  "/user/edit": "/settings/edit-profile",
  "/user/delete": "/settings/delete",
  "/user/saves": "/favorites/saves",
  "/user/auctions": "/settings/auctions",
  "/user/shipping": "/settings/shipping",
  "/user/purchases": "/settings/purchases",
  "/user/payments": "/settings/payments",
  "/user/alerts": "/favorites/alerts",
  "/settings/alerts": "/favorites/alerts",
  "/settings/alerts/:alertID/edit": "/favorites/alerts/:alertID/edit",
  "/settings/alerts/:alertID/artworks": "/favorites/alerts/:alertID/artworks",
  "/alerts/:alertID/edit": "/favorites/alerts/:alertID/edit",
  "/alerts/:alertID/artworks": "/favorites/alerts/:alertID/artworks",
  "/my-collection": "/collector-profile/my-collection",
  "/settings/my-collection": "/collector-profile/my-collection",
  "/collector-profile/follows": "/favorites/follows",
  "/collector-profile/saves": "/favorites/saves",
  "/collector-profile/saves/:id": "/favorites/saves/:id",
  "/page/collector-faqs-selling-on-artsy": "/sell",
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
  "/article/elena-soboleva-what-we-learned-from-writing-7-000-artist-bios":
    "https://partners.artsy.net/resource/what-we-learned-from-writing-artist-bios",
  "/article/gallery-insights-practical-digital-security-for-your-gallery":
    "https://partners.artsy.net/resource/digital-security-for-your-gallery",
  "/article/gallery-insights-brett-gorvy-new-storefont":
    "https://partners.artsy.net/resource/brett-gorvy-online-storefront",
  "/article/gallery-insights-the-pop-up-gallery-checklist":
    "https://partners.artsy.net/resource/pop-up-galleries",
  "/article/gallery-insights-artful-pitch":
    "https://partners.artsy.net/resource/press-for-your-gallery",
  "/article/elena-soboleva-how-to-write-an-effective-press-release":
    "https://partners.artsy.net/resource/write-an-effective-press-release-for-your-gallery",
  "/article/gallery-insights-3-misconceptions-about-professional-art-buyers":
    "https://partners.artsy.net/resource/professional-art-buyers",
  "/article/gallery-insights-vr-galleries-04-04-17":
    "https://partners.artsy.net/resource/vr-for-galleries",
  "/article/gallery-insights-focus-in-on-better-gallery-photography":
    "https://partners.artsy.net/resource/focus-in-on-better-gallery-photography",
  "/article/elena-soboleva-sale-scam-verifying-online-inquiries":
    "https://partners.artsy.net/resource/verify-online-inquiries",
  "/article/gallery-insights-collectors-engaged":
    "https://partners.artsy.net/resource/keep-collectors-engaged",
  "/artsy-vanguard-2019": "/article/artsy-vanguard-2019-50-artists",
  "/series/artsy-vanguard-2019": "/article/artsy-vanguard-2019-50-artists",
  "/venice-biennale-2015": "/partner/56th-venice-biennale",
  "/2015-year-in-art": "/article/artsy-editorial-2015-the-year-in-art",
  "/campaign/art-keeps-going":
    "https://www.artsy.net/collections#art-keeps-going",
  "/the-future-of-art":
    "https://www.wsj.com/articles/carter-cleveland-says-art-in-the-future-will-be-for-everyone-1404762157",
  "/christies-spring-auctions-2015": "/auctions",
  "/clear-cache": "/admin/clear-cache",
  "/dev/blank": "/debug/baseline",
  "/2016-year-in-art": "/article/artsy-editorial-10-moments-2016-art",
  "/gender-equality": "/article/artists-gender-equality",
  "/gender-equality/past": "/article/artsy-editorial-artists-gender-equality",
  "/gender-equality/present":
    "/article/artsy-editorial-artists-gender-equality-ii",
  "/gender-equality/future":
    "/article/artsy-editorial-artists-gender-equality-iii-future",
  "/venice-biennale": "/article/inside-biennale",
  "/venice-biennale/toward-venice":
    "/article/artsy-editorial-inside-biennale-ep-1-venice",
  "/venice-biennale/studio-venezia":
    "/article/artsy-editorial-inside-biennale-ep-2-studio-venezia",
  "/venice-biennale/erwin-wurm":
    "/article/artsy-editorial-inside-biennale-ep-3-erwin-wurm",
  "/venice-biennale/anne-imhof-faust":
    "/article/artsy-editorial-inside-biennale-ep-4-faust",
  "/venice-biennale/italian-pavilion":
    "/article/artsy-editorial-inside-biennale-ep-5-magic",
  "/venice-biennale/nigerian-pavilion":
    "/article/artsy-editorial-inside-biennale-ep-6",
  "/venice-biennale/carol-bove":
    "/article/artsy-editorial-inside-biennale-ep-7-carol-bove",
  "/venice-biennale/dawn-kasper":
    "/article/artsy-editorial-inside-biennale-ep-8-dawn-kasper",
  "/venice-biennale/peoples-choice":
    "/article/artsy-editorial-inside-biennale-ep-9-peoples-choice",
  "/editorial": "/articles",
  "/auction-partnerships": "https://partners.artsy.net/auction-partnerships/",
  "/collector-profile": "/collector-profile/my-collection",
  "/log_in": "/login",
  "/sign_up": "/signup",
  "/meet-the-specialists": "/sell",
  "/conditions-of-sale": "/supplemental-cos",
}

const router = express.Router()

export const getRedirectUrl = (
  req: ArtsyRequest,
  redirects: Record<string, string>
) => {
  const fromPath = req.route.path
  const toPath = redirects[fromPath]

  const queryString = url.parse(req.url).search || ""
  const redirectUrl = toPath.replace(
    /:(\w+)/g,
    (_, key) => req.params[key] || ":unknown"
  )

  return redirectUrl + queryString
}

for (let from in PERMANENT_REDIRECTS) {
  router.get(from, (req, res) => {
    const redirectUrl = getRedirectUrl(req, PERMANENT_REDIRECTS)
    res.redirect(301, redirectUrl)
  })
}

// Temporarily (302) redirect a specific route or route pattern
const TEMP_REDIRECTS = {
  "/art-appraisals": "/sell",
}

for (let from in TEMP_REDIRECTS) {
  const path = TEMP_REDIRECTS[from]

  router.get(from, (req: ArtsyRequest, res: ArtsyResponse) => {
    const queryString = url.parse(req.url).search || ""

    res.redirect(302, path + queryString)
  })
}

export const hardcodedRedirectsMiddleware = router
