Backbone = require 'backbone'
sd = require('sharify').data
{ isEmail } = require 'validator'
{ trim } = require 'underscore.string'

module.exports = class Inquiry extends Backbone.Model

  url: -> "#{sd.API_URL}/api/v1/me/artwork_inquiry_request"

  validate: (attrs) ->
    if @get('session_id')? and not (isEmail(trim attrs.email) and attrs.name?)
      return "Please include a valid name and email address."
    return
