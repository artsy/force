_ = require 'underscore'

module.exports = (req, res, next) ->
  sd = res.locals.sd
  slug = req.query['m-id']

  # This is just for the Seattle Art Fair campaign and should be removed after
  # the fair closes.
  # (commenting this out for now because the facebook sign up is throwing an error)
  # slug = 'ca3' if !slug and sd.CURRENT_PATH is '/seattle-art-fair-2017'

  modalData = _.findWhere(sd.MOBILE_MARKETING_SIGNUP_MODALS, { slug: slug })

  res.locals.modal = modalData if modalData

  loggedOut = not req.user?

  res.locals.showMobileMarketingSignupModal = true if loggedOut and modalData? and sd.IS_MOBILE
  next()
