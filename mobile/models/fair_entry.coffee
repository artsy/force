Backbone = require 'backbone'
moment = require 'moment-twitter'

module.exports = class FairEntry extends Backbone.Model

  # Europa API response:
  # --------------------
  # id, external_id (id from api response), and payload(full json api response)
  # For martsy purposes, we really only need the API payload.
  parse: (data) ->
    data.payload

  formatDate: ->
    date = parseInt(@get('created_time')) * 1000
    moment(date).twitterShort()
