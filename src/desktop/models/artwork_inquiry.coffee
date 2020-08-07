_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL, SESSION_ID } = require('sharify').data
Cookies = require '../components/cookies/index.coffee'

module.exports = class ArtworkInquiry extends Backbone.Model
  urlRoot: "#{API_URL}/api/v1/me/artwork_inquiry_request"

  defaults:
    session_id: SESSION_ID
    referring_url: Cookies.get('force-referrer')
    landing_url: Cookies.get('force-session-start')

  send: (attributes, options = {}) ->
    (if @isNew() then @save({}, error: options.error) else Promise.resolve())
      .then => @save attributes, _.extend options, url: "#{@url()}/send"
