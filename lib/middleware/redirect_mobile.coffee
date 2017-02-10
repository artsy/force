#
# Detects a mobile browser by user agent and redirects it to Microgravity
#

{ MOBILE_URL, TEAM_BLOGS } = require '../../config'
express = require 'express'
router = express.Router()

isResponsive = (req, res, next) ->
  res.locals.sd.IS_RESPONSIVE = true
  next()

redirect = (req, res, next) ->
  return next() unless ua = req.get 'user-agent'
  isPhone = (ua.match(/iPhone/i) && !ua.match(/iPad/i)) ||
            (ua.match(/Android/i) && ua.match(/Mobile/i)) ||
            (ua.match(/Windows Phone/i)) ||
            (ua.match(/BB10/i)) ||
            (ua.match(/BlackBerry/i))
  res.locals.sd.IS_MOBILE = isPhone?
  return next() if res.locals.sd.IS_RESPONSIVE
  if isPhone and not req.query?.stop_microgravity_redirect
    res.redirect MOBILE_URL + req.url
  else
    next()

router.get '/apply*', isResponsive
router.get '/gallery-insights/opt-in' , isResponsive
router.get '/auction/:id/buyers-premium', isResponsive
router.get '/auction-registration/:id', isResponsive
router.get '/order', isResponsive
router.get '/christies-spring-auctions-2015', isResponsive
router.get '/jobs', isResponsive
router.get '/press/*', isResponsive
router.get '/ArtsySocialMediaToolkit.pdf', isResponsive
router.get '/inquiry/*', isResponsive
router.get '/consign', isResponsive
router.get '/professional-buyer*', isResponsive
router.get '/2016-year-in-art*', isResponsive
router.get '/article/*', isResponsive
router.get '/about/*', isResponsive
router.get TEAM_BLOGS, isResponsive
router.use redirect
module.exports = router
