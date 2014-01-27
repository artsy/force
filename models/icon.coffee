Backbone = require 'backbone'
_        = require 'underscore'
sd       = require('sharify').data
Icon     = require './icon.coffee'
{ Image } = require 'artsy-backbone-mixins'

module.exports = class Icon extends Backbone.Model

  _.extend @prototype, Image

  urlRoot: "#{sd.ARTSY_URL}/api/v1/#{@profileId}/icon"

  imageUrl: ->
    Image.imageUrl.apply(@, arguments).replace('.jpg', '.png')