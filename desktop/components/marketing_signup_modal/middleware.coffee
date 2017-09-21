_ = require 'underscore'
JSONPage = require '../../components/json_page'

module.exports = (req, res, next) ->
  sd = res.locals.sd
  slug = req.query['m-id']

  page = new JSONPage name: 'marketing-signup-modals'

  page.get()
    .then (data) ->
      console.log('data:', data)
      res.locals.marketingSignupModals = data
      sd.NEW_MARKETING_MODALS = data

    .catch next()
