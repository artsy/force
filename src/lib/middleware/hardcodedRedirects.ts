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
  "/category": "/categories",
  "/fair-application": "/apply/fair",
  "/fairs": "art-fairs",
  "/collector/edit": "/profile/edit",
  "/filter/artworks": "/browse",
  "/_=_": "/",
  "/filter/artworks/*": "/browse",
  "/about/press": "/press/press-releases",
  "/gallery": "/galleries",
  "/about/page/events": "/press/in-the-media",
  "/partners": "/galleries",
  "/about/jobs": "/jobs",
  "/institution": "/institutions",
  "/about/page/press": "/press/press-releases",
  "/gene": "/categories", 
  "/dev": "/inquiry/development",
  
"/genes": "/categories",
  
"/artist": "/artists",
  
"/partner-application": "/apply",
  
"/article/jesse-kedy-digital-marketing-manager-organic-growth-06-22-15":
    "/article/artsy-jobs-associate-director-of-organic-growth",
  

"/feature/art-fairs": "art-fairs", 
  

"/favorites": "/user/saves#saved-artworks",
  

"/settings": "/user/edit",
  

"/feature/artsy-education": "/artsy-education",
  

"/artsy.net/artwork/marilyn-minter-miley": "/artwork/marilyn-minter-miley",
  
// Facebook passport bug, see: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
"/press": "/press/in-the-media",
  
"/article/artsy-editorial-the-year-in-art-2016": "/2016-year-in-art",
  
"/following/artists": "/user/saves#artists",
  // HACK: Redirect the "auction" profile to the LAMA auction
"/home/featured_works": "/tag/apple/artworks",
  "/following/genes": "/user/saves#categories",
  "/lama": "/auction/los-angeles-modern-auctions-march-2015",
  "/following/profiles": "/user/saves#galleries-institutions",
  "/home/featured%20works": "/tag/apple/artworks",
  "/job/mobile-engineer": "/article/artsy-jobs-mobile-engineer",
}

for (let from in redirects) {
  const path = redirects[from]
  router.get(from, to(path))
}

export const hardcodedRedirectsMiddleware = router
