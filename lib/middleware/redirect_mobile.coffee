#
# Detects a mobile browser by user agent and redirects it to Microgravity
#

{ MOBILE_URL } = require '../../config'
express = require 'express'
router = express.Router()

isResponsive = (req, res, next) ->
  res.locals.sd.IS_RESPONSIVE = true
  next()

redirect = (req, res, next) ->
  return next() if res.locals.sd.IS_RESPONSIVE
  return next() unless ua = req.get 'user-agent'
  isPhone = (ua.match(/iPhone/i) && !ua.match(/iPad/i)) ||
            (ua.match(/Android/i) && ua.match(/Mobile/i)) ||
            (ua.match(/Windows Phone/i)) ||
            (ua.match(/BB10/i)) ||
            (ua.match(/BlackBerry/i))
  if isPhone and not req.query?.stop_microgravity_redirect
    res.redirect MOBILE_URL + req.url
  else
    next()

router.get '/partner-application*', isResponsive
router.get '/fair-application*', isResponsive
router.use redirect
module.exports = router