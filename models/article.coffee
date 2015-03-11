_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data
Artwork = require '../models/artwork.coffee'
Artworks = require '../collections/artworks.coffee'
{ crop, resize } = require '../components/resizer/index.coffee'

module.exports = class Article extends Backbone.Model
  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  defaults:
    sections: [{ type: 'text', body: '' }]

  fetchWithRelated: (options = {}) ->
    # Deferred require
    Articles = require '../collections/articles.coffee'
    footerArticles = new Articles
    Q.all([
      @fetch()
      footerArticles.fetch(
        cache: true
        data:
          # Tier 1 Artsy Editorial articles. TODO: Smart footer data.
          author_id: '503f86e462d56000020002cc'
          published: true
          tier: 1
      )
    ]).fail((r) -> options.error null, r).then =>
      slideshowArtworks = new Artworks
      dfds = []
      if (slideshow = _.first(@get 'sections')).type is 'slideshow'
        for item in slideshow.items when item.type is 'artwork'
          dfds.push new Artwork(id: item.id).fetch
            cache: true
            data: access_token: options.accessToken
            success: (artwork) ->
              slideshowArtworks.add(artwork)
      Q.all(dfds).fin =>
        options.success this, footerArticles, slideshowArtworks

  isTopTier: ->
    @get('tier') is 1

  href: ->
    "/article/#{@get('slug')}"

  authorHref: ->
    if @get('author') then "/#{@get('author').profile_handle}" else @href()

  cropUrlFor: (attr, args...) ->
    crop @get(attr), args...

  date: (attr) ->
    moment @get(attr)
