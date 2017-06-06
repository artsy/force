_ = require 'underscore'

module.exports = (req, res, next) ->
  sd = res.locals.sd
  slug = req.query['m-id']
  modalData = _.findWhere(sd.MOBILE_MARKETING_SIGNUP_MODALS, { slug: slug })

  res.locals.modal = modalData if modalData

  loggedOut = not req.user?

  res.locals.showMobileMarketingSignupModal = true if loggedOut and modalData? and sd.IS_MOBILE
  next()
