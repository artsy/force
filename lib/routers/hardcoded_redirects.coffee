url = require 'url'
express = require 'express'
router = express.Router()

to = require '../to'

# Want to permanently redirect a specific route or route pattern?
# Put em' here:

redirects =
  '/filter/artworks': '/browse'
  '/filter/artworks/*': '/browse'
  '/genes': '/categories'
  '/partner-application': '/apply'
  '/fair-application': '/apply/fair'
  '/fairs': 'art-fairs'
  '/feature/art-fairs': 'art-fairs'
  '/settings': '/user/edit'
  '/_=_': '/' # Facebook passport bug, see: https://github.com/jaredhanson/passport-facebook/issues/12#issuecomment-5913711
  '/press': '/press/press-releases'
  '/about/press': '/press/press-releases'
  '/about/page/press': '/press/press-releases'
  '/about/page/events': '/press/in-the-media'
  '/about/jobs': '/jobs'
  '/lama': '/auction/los-angeles-modern-auctions-march-2015' # HACK: Redirect the "auction" profile to the LAMA auction
  '/home/featured_works': '/tag/apple/artworks'
  '/home/featured%20works': '/tag/apple/artworks'
  '/dev': '/inquiry/development'
  '/artist': '/artists'

for from, path of redirects
  router.get from, to(path)

module.exports = router
