_ = require 'underscore'
JSONPage = require '../../desktop/components/json_page'

module.exports = (req, res, next) ->
  unless slug = req.query['m-id']
    res.locals.sd.MARKETING_SIGNUP_MODALS = []
    return next()

  page = new JSONPage name: 'marketing-signup-modals'
  page.get()
    .then (data) ->
      # Used by desktop
      res.locals.sd.MARKETING_SIGNUP_MODALS = data.modals
      
      # Used by mobile
      res.locals.sd.MOBILE_MARKETING_SIGNUP_MODALS = data.modals
      modalData = _.findWhere(data.modals, { slug: slug })
      res.locals.modal = modalData if modalData
      loggedOut = not req.user?
      res.locals.showMarketingSignupModal = true if loggedOut and modalData? and res.locals.sd.IS_MOBILE
      
      next()
    .catch next
