_ = require 'underscore'

module.exports = (req, res, next) ->
  sd = res.locals.sd
  slug = req.query['m-id']

  # Launches marketing signup modal for targeted url
  slug = 'ca3' if !slug and sd.CURRENT_PATH is sd.TARGET_CAMPAIGN_URL

  modalData = _.findWhere(sd.MOBILE_MARKETING_SIGNUP_MODALS, { slug: slug })

  res.locals.modal = modalData if modalData

  loggedOut = not req.user?

  res.locals.showMobileMarketingSignupModal = true if loggedOut and modalData? and sd.IS_MOBILE
  next()
