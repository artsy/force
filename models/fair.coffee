sd        = require('sharify').data
_         = require 'underscore'
Backbone  = require 'backbone'
{ Image } = require 'artsy-backbone-mixins'

module.exports = class Fair extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/fair"

  href: ->
    "/#{@get('id')}"
