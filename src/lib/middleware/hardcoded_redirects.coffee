url = require 'url'
express = require 'express'
router = express.Router()

to = (path) -> (req, res) ->
  queryString = url.parse(req.url).search or ''
  res.redirect 301, path + queryString

# Want to permanently redirect a specific route or route pattern?
# Put em' here:

redirects =
  '/partners': '/galleries'
  '/gallery': '/galleries'
  '/institution': '/institutions'
  '/filter/artworks': '/browse'
  '/filter/artworks/*': '/browse'
  '/category': '/categories'
  '/gene': '/categories'
  '/genes': '/categories'
  '/partner-application': '/apply'
  '/fair-application': '/apply/fair'
  '/fairs': 'art-fairs'
  '/feature/art-fairs': 'art-fairs'
  '/settings': '/user/edit'
  '/collector/edit': '/profile/edit'
  '/_=_': '/' # Facebook passport bug, see: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
  '/press': '/press/in-the-media'
  '/about/press': '/press/press-releases'
  '/about/page/press': '/press/press-releases'
  '/about/page/events': '/press/in-the-media'
  '/about/jobs': '/jobs'
  '/lama': '/auction/los-angeles-modern-auctions-march-2015' # HACK: Redirect the "auction" profile to the LAMA auction
  '/home/featured_works': '/tag/apple/artworks'
  '/home/featured%20works': '/tag/apple/artworks'
  '/dev': '/inquiry/development'
  '/artist': '/artists'
  '/job/mobile-engineer': '/article/artsy-jobs-mobile-engineer'
  '/article/jesse-kedy-digital-marketing-manager-organic-growth-06-22-15': '/article/artsy-jobs-associate-director-of-organic-growth'
  '/feature/artsy-education': '/artsy-education'
  '/favorites': '/user/saves#saved-artworks'
  '/following/artists': '/user/saves#artists'
  '/following/genes': '/user/saves#categories'
  '/following/profiles': '/user/saves#galleries-institutions'
  '/artsy.net/artwork/marilyn-minter-miley': '/artwork/marilyn-minter-miley'
  '/article/artsy-editorial-the-year-in-art-2016': '/2016-year-in-art'

for from, path of redirects
  router.get from, to(path)

module.exports = router
