_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data
Artwork = require '../models/artwork.coffee'
Section = require '../models/section.coffee'
Artworks = require '../collections/artworks.coffee'
{ crop, resize } = require '../components/resizer/index.coffee'
Relations = require './mixins/relations/article.coffee'
{ stripTags } = require 'underscore.string'
{ compactObject } = require './mixins/compact_object.coffee'

module.exports = class Article extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  defaults:
    sections: [{ type: 'text', body: '' }]

  emptyArtworkSection: ->
    @set sections: (section for section in @get('sections') \
      when section.type isnt 'artworks')


  fetchWithRelated: (options = {}) ->
    # Deferred require
    Articles = require '../collections/articles.coffee'
    footerArticles = new Articles
    Q.all([
      @fetch(
        error: options.error
        headers: 'X-Access-Token': options.accessToken or ''
      )
      footerArticles.fetch(
        error: options.error
        cache: true
        data:
          # Tier 1 Artsy Editorial articles. TODO: Smart footer data.
          author_id: '503f86e462d56000020002cc'
          published: true
          tier: 1
          sort: '-published_at'
      )
    ]).then =>
      slideshowArtworks = new Artworks
      dfds = []
      # Get slideshow artworks to render server-side carousel
      if @get('sections')?.length and
         (slideshow = _.first(@get 'sections')).type is 'slideshow'
        for item in slideshow.items when item.type is 'artwork'
          dfds.push new Artwork(id: item.id).fetch
            cache: true
            data: access_token: options.accessToken
            success: (artwork) ->
              slideshowArtworks.add(artwork)
      # Get related section content if a part of one
      if @get('section_ids').length
        dfds.push (section = new Section(id: @get('section_ids')[0])).fetch()
        dfds.push (sectionArticles = new Articles).fetch(
          data: section_id: @get('section_ids')[0], published: true, limit: 50
        )
      Q.allSettled(dfds).fin =>
        @set('section', section) if section
        options.success(
          article: this
          footerArticles: footerArticles
          slideshowArtworks: slideshowArtworks
          section: section
          allSectionArticles: sectionArticles if section
        )

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

  toJSONLD: ->       # article metadata tag for parse.ly
    creator = []
    creator.push @get('author').name if @get('author')
    creator = _.union(creator, _.pluck(@get('contributing_authors'), 'name')) if @get('contributing_authors').length
    compactObject {
      "@context": "http://schema.org"
      "@type": "NewsArticle"
      "headline": @get('thumbnail_title')
      "url": @href()
      "thumbnailUrl": @get('thumbnail_image')
      "dateCreated": @get('published_at')
      "articleSection": if @get('section') then @get('section').get('title') else "Editorial"
      "creator": creator
      "keywords": @get('tags')
    }
