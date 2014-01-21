_        = require 'underscore'
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
Image    = require './mixins/image.coffee'
sd = require('sharify').data

module.exports = class Gene extends Backbone.Model

  _.extend @prototype, Image

  urlRoot: "#{sd.ARTSY_URL}/api/v1/gene"

  clientUrl: -> "/gene/#{@get('id')}"

  href: -> "#{sd.ARTSY_URL}/gene/#{@get('id')}"

  displayName: -> @get('name')

  alphaSortKey: -> @get('id')

  fetchArtworks: (options) ->
    artworks = new Artworks
    artworks.url = "#{@url()}/artworks"
    artworks.fetch options

  imageUrl: (version) ->
    @fullyQualifiedImageUrl(@get('image_url')).replace ':version', version
