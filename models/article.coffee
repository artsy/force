_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
Articles = require '../collections/articles.coffee'
Q = require 'Q'

module.exports = class Article extends Backbone.Model

  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  slideshowArtworks: ->
    return null unless (slideshow = _.first @get 'sections')?.type is 'slideshow'
    new Artworks (for item in slideshow.items when item.type is 'artwork'
      { id: item.id })

  fetchWithRelated: (options = {}) ->
    footerArticles = new Articles
    author = new Backbone.Model
    Q.all(
      footerArticles.fetch
        cache: true
        data:
          # Artsy Editorial. TODO: Smart footer data.
          author_id: '503f86e462d56000020002cc'
          published: true
      @fetch
        cache: true
        headers: 'X-Access-Token': options.accessToken
    ).fail((r) -> options.error null, r).then =>
      slideshowArtworks = @slideshowArtworks()
      Q.all(_.compact _.flatten [
        author.fetch
          cache: true
          url: "#{sd.API_URL}/api/v1/user/#{@get 'author_id'}"
        slideshowArtworks?.map (a) =>
          a.fetch
            cache: true
            data: access_token: options.accessToken
      ]).fail((r) -> options.error null, r).then =>
        options.success this, author, footerArticles, slideshowArtworks