Promise = require 'bluebird-q'

module.exports = (page) ->
  middleware: (req, res, next) ->
    unless req.user?
      return res.redirect page.paths.show

    next()

  get:
    index: (req, res, next) ->
      page
        .get()
        .then (data) ->
          res.render 'pages/landing/templates/index', data

        .catch next

    complete: (req, res, next) ->
      { user } = req
      { collectorProfile } = user.related()

      Promise
        .all [
          user.fetch()
          collectorProfile.fetch data: access_token: user.get 'accessToken'
        ]

        .then ->
          res.locals.sd.CURRENT_USER = user.toJSON()
          res.locals.sd.COLLECTOR_PROFILE = collectorProfile.toJSON()
          res.render 'pages/complete/templates/index'

        .catch (err) ->
          console.log err
          next err
