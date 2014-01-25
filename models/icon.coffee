Backbone = require 'backbone'
_        = require 'underscore'
sd       = require('sharify').data
Icon     = require './icon.coffee'
{ Image } = require 'artsy-backbone-mixins'

module.exports = class Icon extends Backbone.Model
  _.extend @prototype, Image

  urlRoot: "#{sd.ARTSY_URL}/api/v1/#{@profileId}/icon"

  imageUrl: (version='circle') ->
    if @hasImage version
      @get('image_url').replace(':version', version).replace('.jpg', '.png')
    else
      @missingImageUrl()
