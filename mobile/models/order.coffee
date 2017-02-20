Backbone = require 'backbone'
{ API_URL, SESSION_ID } = require('sharify').data

module.exports = class Order extends Backbone.Model

  urlRoot: -> "#{API_URL}/api/v1/me/order"

  resume: (options) =>
    @isSaved = -> false
    data = @getSessionData((options.session_id or SESSION_ID), options.accessToken)
    data.token = options.token
    @save null,
      url: "#{@url()}/resume"
      data: data
      success: options.success
      error: options.error

  # Orders require a unique identifiier. If a user is logged in, that is the accessToken, otherwise it is the session id
  getSessionData: (session_id, accessToken) ->
    data = {}
    if accessToken
      data.access_token = accessToken
    else if session_id
      data.session_id = session_id
    data

  getYearRange: (range=10) ->
    startDate = new Date()
    startYear = startDate.getFullYear()

    endDate = new Date "01 Jan #{startYear + range}"
    endYear = endDate.getFullYear()

    [startYear..endYear]
