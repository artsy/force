_ = require 'underscore'
Order = require '../../models/order.coffee'
{ APP_URL } = require('sharify').data

module.exports.resume = (req, res) ->
  unless (token = req.query.token) and (orderId = req.params.id)
    return res.redirect '/'

  # Redirect to Force order resume url until we build in order support
  res.redirect "#{APP_URL}/order/#{req.params.id}/resume?token=#{req.query.token}&stop_microgravity_redirect=true"
