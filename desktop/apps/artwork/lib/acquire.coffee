Promise = require 'bluebird-q'
PendingOrder = require '../../../models/pending_order'
analyticsHooks = require '../../../lib/analytics_hooks'
redirectTo = (path) -> location.assign path

module.exports = (artwork_id, edition_set_id) ->
  order = new PendingOrder

  analyticsHooks
    .trigger 'order:item-added', "Artwork:#{artwork_id}"

  Promise order.save
    artwork_id: artwork_id
    edition_set_id: edition_set_id
  , success: ->
    redirectTo "/order/#{order.id}/resume?token=#{order.get 'token'}"
