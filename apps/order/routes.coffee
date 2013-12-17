Order = require '../../models/order'
{ SECURE_APP_URL, APP_URL } = require('../../config')

@index = (req, res) ->
  # SECURE_APP_URL in development uses http while staging and production use https, so match with a regex to avoid redirect loop.
  unless (req.protocol || 'http') is SECURE_APP_URL.match(/^https?/)[0]
    res.redirect SECURE_APP_URL + '/order'
  order = new Order
  order.fetch
    success: (order) =>
      res.render 'template', {order: order}
    error: ->
      res.redirect APP_URL
