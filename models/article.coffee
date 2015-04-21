_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data
Artwork = require '../models/artwork.coffee'
Vertical = require '../models/vertical.coffee'
Artworks = require '../collections/artworks.coffee'
{ crop, resize } = require '../components/resizer/index.coffee'
Relations = require './mixins/relations/article.coffee'
{ stripTags } = require 'underscore.string'

module.exports = class Article extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  defaults:
    sections: [{ type: 'text', body: '' }]

  fetchWithRelated: (options = {}) ->
    # Deferred require
    Articles = require '../collections/articles.coffee'
    footerArticles = new Articles
    Q.all([
      @fetch(error: options.error)
      footerArticles.fetch(
        error: options.error
        cache: true
        data:
          # Tier 1 Artsy Editorial articles. TODO: Smart footer data.
          author_id: '503f86e462d56000020002cc'
          published: true
          tier: 1
      )
    ]).then =>
      slideshowArtworks = new Artworks
      dfds = []
      # Get slideshow artworks to render server-side carousel
      if (slideshow = _.first(@get 'sections')).type is 'slideshow'
        for item in slideshow.items when item.type is 'artwork'
          dfds.push new Artwork(id: item.id).fetch
            cache: true
            data: access_token: options.accessToken
            success: (artwork) ->
              slideshowArtworks.add(artwork)
      # Get related vertical content if a part of one
      if @get('vertical_id')
        dfds.push (vertical = new Vertical(id: @get('vertical_id'))).fetch()
        dfds.push (featuredVerticalArticles = new Articles()).fetch(
          data: vertical_id: @get('vertical_id')
        )
      Q.all(dfds).fin =>
        options.success
          article: this
          footerArticles: footerArticles
          slideshowArtworks: slideshowArtworks
          vertical: vertical
          featuredVerticalArticles: featuredVerticalArticles

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

  strip: (attr) ->
    stripTags(@get attr)
