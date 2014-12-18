_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'

module.exports = class Article extends Backbone.Model

  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  initialize: ->
    if (slideshow = _.first @get 'sections')?.type is 'slideshow'
      @slideshowArtworks = new Artworks(
        { id: item.id } for item in slideshow.items when item.type is 'artwork'
      )

  fetchAuthor: (options) ->
    new Backbone.Model().fetch
      url: "#{sd.API_URL}/api/v1/user/#{@get 'author_id'}"
      cache: options.cache
      error: options.error
      success: options.success