Backbone = require 'backbone'
{ API_URL, SESSION_ID } = require('sharify').data

module.exports = class PendingOrder extends Backbone.Model
  url: "#{API_URL}/api/v1/me/order/pending/items"

  defaults:
    artwork_id: null
    edition_set_id: null
    quantity: null
    replace_order: true
    session_id: SESSION_ID
