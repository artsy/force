_             = require 'underscore'
Backbone      = require 'backbone'
sd            = require('sharify').data
Artworks      = require '../collections/artworks.coffee'
markdownMixin = require './mixins/markdown.coffee'
Image         = require './mixins/image.coffee'
Post          = require './post.coffee'
{ smartTruncate } = require '../components/util/string.coffee'

module.exports = class Artist extends Backbone.Model

  _.extend @prototype, markdownMixin
  _.extend @prototype, Image

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/artist"

  clientUrl: -> "/artist/#{@get('id')}"

  initialize: ->
    @relatedArtists = new Backbone.Collection [], model: Artist
    @relatedArtists.url = "#{sd.ARTSY_URL}/api/v1/related/layer/main/artists"
    @relatedContemporary = new Backbone.Collection [], model: Artist
    @relatedContemporary.url = "#{sd.ARTSY_URL}/api/v1/related/layer/contemporary/artists"
    @relatedPosts = new Backbone.Collection [], model: Post
    @relatedPosts.url = "#{sd.ARTSY_URL}/api/v1/related/posts"

  fetchRelatedArtists: (type, options = {}) ->
    @["related#{type}"].fetch _.extend
      remove: false
      data: _.extend (options.data ? {}),
        size: 5
        'artist[]': @get 'id'
        'exclude_artists_without_artworks': true
    , options

  fetchArtworks: (options) ->
    col = new Artworks
    col.url = "#{sd.ARTSY_URL}/api/v1/artist/#{@get 'id'}/artworks"
    col.fetch options

  fetchRelatedPosts: (options = {}) ->
    @relatedPosts.fetch _.extend
      remove: false
      data: _.extend (options.data ? {}),
        size: 15
        'artist[]': @get 'id'
    , options

  toPageTitle: ->
    "#{@htmlToText('name')} | Artist Bio and Art for Sale | Artsy"

  toPageDescription: (length=200) ->
    # artists are usually displayed: Name (Nationality, Born-Died)
    info = _.compact([@get('nationality'), @get('years')]).join(', ')
    smartTruncate(_.compact([
     (if info?.length > 0 then "#{@get('name')} (#{info})" else @get('name'))
     (if @get('blurb')?.length > 0 then @mdToHtmlToText('blurb') else undefined)
    ]).join(". "), length)

  isFollowed: (followArtistCollection) ->
    followArtistCollection && followArtistCollection.isFollowed(@)
