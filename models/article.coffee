_ = require 'underscore'
Q = require 'q'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data
Artworks = require '../collections/artworks.coffee'
{ crop, resize } = require '../components/resizer/index.coffee'

module.exports = class Article extends Backbone.Model
  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  defaults:
    sections: [{ type: 'text', body: '' }]

  slideshowArtworks: ->
    return null unless (slideshow = _.first @get 'sections')?.type is 'slideshow'
    new Artworks (for item in slideshow.items when item.type is 'artwork'
      { id: item.id })

  fetchWithRelated: (options = {}) ->
    # Deferred require
    Articles = require '../collections/articles.coffee'
    footerArticles = new Articles
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
