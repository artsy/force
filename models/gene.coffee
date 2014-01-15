Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
sd = require('sharify').data

module.exports = class Gene extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/gene"

  href: -> "#{sd.ARTSY_URL}/gene/#{@get('id')}"

  displayName: -> @get('name')

  alphaSortKey: -> @get('id')

  fetchArtworks: (options) ->
    artworks = new Artworks
    artworks.url = "#{@url()}/artworks"
    artworks.fetch options
