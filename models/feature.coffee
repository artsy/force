#
# Copy / Paste from microgravity.
# TODO: Port required models, collections, and mixins and incorperate
#       https://github.com/artsy/artsy-backbone-mixins
#
_             = require 'underscore'
sd            = require('sharify').data
imageMixin    = require './mixins/image.coffee'
Artworks      = require '../collections/artworks.coffee'
Backbone      = require 'backbone'
{ smartTruncate } = require "../components/util/string.coffee"

module.exports = class Feature extends Backbone.Model

  _.extend @prototype, imageMixin

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/feature"

  hasImage: (version = 'wide') ->
    version in (@get('image_versions') || [])

  metaTitle: ->
    "#{@get('name')} | Artsy"

  metaDescription: (truncate = false) ->
    if truncate
      smartTruncate "#{@get('name')} on Artsy", 200
    else
      "#{@get('name')} on Artsy"

  href: ->
    "/feature/#{@get('id')}"
