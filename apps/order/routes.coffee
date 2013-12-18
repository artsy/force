{ SECURE_APP_URL, APP_URL } = require('../../config')
CurrentUser = require '../../models/current_user'

@index = (req, res) ->
  # SECURE_APP_URL in development uses http while staging and production use https, so match with a regex to avoid redirect loop.
  unless (req.protocol || 'http') is SECURE_APP_URL.match(/^https?/)[0]
    res.redirect SECURE_APP_URL + '/order'
  unless req.user
    res.redirect APP_URL
  req.user.fetchPendingOrder
    success: (order) =>
      res.render 'template', {order: order}
    error: ->
      res.redirect APP_URL

@resume = (req, res) ->
  unless (token = req.query.token) && (orderId = req.params.id)
    res.redirect APP_URL
  unless req.user
    res.redirect APP_URL
  req.user.resumeOrder orderId, token,
    success: ->
      res.redirect SECURE_APP_URL + '/order'
    error: ->
      res.redirect APP_URL