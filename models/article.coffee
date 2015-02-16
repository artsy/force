_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
sd = require('sharify').data
Artworks = require '../collections/artworks.coffee'

module.exports = class Article extends Backbone.Model
  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  slideshowArtworks: ->
    return null unless (slideshow = _.first @get 'sections')?.type is 'slideshow'
    new Artworks (for item in slideshow.items when item.type is 'artwork'
      { id: item.id })

  fetchWithRelated: (options = {}) ->
    # Deferred require
    Articles = require '../collections/articles.coffee'
    footerArticles = new Articles
    author = new Backbone.Model
    Q.all(
      @fetch()
      footerArticles.fetch
        cache: true
        data:
          # Artsy Editorial. TODO: Smart footer data.
          author_id: '503f86e462d56000020002cc'
          published: true
    ).fail((r) -> options.error null, r).then =>
      slideshowArtworks = @slideshowArtworks()
      Q.all(_.compact _.flatten [
        author.fetch
          cache: true
          url: "#{sd.API_URL}/api/v1/user/#{@get 'author_id'}"
        slideshowArtworks?.map (a) =>
          dfd = Q.defer()
          a.fetch
            cache: true
            data: access_token: options.accessToken
            error: ->
              slideshowArtworks.remove(a)
              dfd.resolve()
            success: -> dfd.resolve()
          dfd
      ]).fail((r) -> options.error null, r).then =>
        options.success this, author, footerArticles, slideshowArtworks

  isTopTier: ->
    @get('tier') is 1
