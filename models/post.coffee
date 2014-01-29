_                 = require 'underscore'
Backbone          = require 'backbone'
sd                = require('sharify').data
Profile           = require('./profile.coffee')
Artwork           = require('./artwork.coffee')
Artists           = require('../collections/artists.coffee')
Artworks          = require('../collections/artworks.coffee')
Attachments       = require('../components/post/collections/post_attachments.coffee')
Reposts           = require('../components/post/collections/reposts.coffee')
moment            = require 'moment'

{ smartTruncate } = require '../components/util/string.coffee'

module.exports = class Post extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/post"
  href: -> "/post/#{@get('id')}"
  profile: -> new Profile @get('profile')

  metaImage: ->
    if @has 'image_url' and @get 'image_versions' and @hasImage 'large'
      @imageUrl 'large'
    else if @artworks?.length > 0 and @artworks.first().hasImage 'large'
      @artworks.first().imageUrl 'large'
    else
      null

  shareTitle: ->
    profile = @profile()
    if @get('title') and profile?.displayName()
      "#{profile.displayName()}: #{@get('title')}"
    else if profile?.displayName()
      "#{profile.displayName()} on Artsy"
    else if @get('title')
      "#{@get('title')}"
    else
      "Post on @artsy"

  titleOrBody: (length=60) ->
    if @get('title')
      smartTruncate @get('title'), length
    else if @get('summary')
      smartTruncate @get('summary'), length

  metaTitle: ->
    _.compact([
      @profile()?.displayName()
      @titleOrBody()
      "Artsy"
    ]).join(" | ")

  artworkTitles: ->
    return unless @get('artworks')
    _.compact(for artwork in @get('artworks')
      new Artwork(artwork).toOneLine()
    ).join(', ')

  metaDescription: ->
    _.compact([
      smartTruncate(@get('summary'), 200)
      @artworkTitles()
    ]).join(" | ")

  defaultImage: ->
    _.first(@artworks())?.defaultImage() or _.first(@images()) or {}

  artworks: ->
    postArtworks = _.filter(@get('attachments'), (attachment) ->
      attachment.type == "PostArtwork"
    )
    _.map postArtworks, (postArtwork) -> new Artwork(postArtwork.artwork)

  hasArworks: -> @artworks()?.length > 0

  images: ->
    _.filter(@get('attachments'), (attachment) ->
      attachment.type == "PostImage"
    )

  postedAt: ->
    moment(@get('last_promoted_at')).fromNow()

  repostedBy: ->
    @get('reposts')?[0]?.profile?.owner?.name

  attachments: -> new Attachments(@get('attachments')).models

  reposts: -> @get('reposts')

  ensureRepostsFetched: (callback) ->
    unless @get('reposts')
      collection = new Reposts()
      collection.fetch
        data:
          post_id: @get('id')
        success: =>
          @set reposts: collection
          callback?(@get('reposts'))
      @set reposts: collection
    else
      callback?(@get('reposts'))

  #
  # Admin for editing, flagging  and reposting
  #
  feature: (options) ->
    @set featured: true
    @save
      success: options?.success
      error: options?.error

  unfeature: (options) ->
    @set featured: false
    @save
      success: options?.success
      error: options?.error

  flag: (options) ->
    @set flagged: true
    @save
      success: options?.success
      error: options?.error

  unflag: (options) ->
    @set flagged: false
    @save
      success: options?.success
      error: options?.error

  repost: (options) ->
    model = new Backbone.Model()
    model.url = "#{sd.ARTSY_URL}/api/v1/repost"
    model.save
      post_id: @get('id')
      success: (data, status, xhr) =>
        @get('reposts').add data
        options?.success(data, status, xhr)
      error: options?.error

  unrepost: (repost, options) ->
    model = new Backbone.Model id: @get('id')
    model.url = "#{sd.ARTSY_URL}/api/v1/repost"
    model.destroy
      data:
        post_id: @get('id')
      success: options?.success
      error: options?.error

  ensureFeatureArtworksFetched: (callback) ->
    if ! @get('feature_artworks')
      artworks = new Artworks()
      artworks.fetch
        url: "#{@url()}/features/artworks"
        success: (artworks) =>
          @set('feature_artworks', artworks)
          callback?(artworks)
    else
      callback?(@get('feature_artworks'))

  ensureFeatureArtistsFetched: (callback) ->
    if ! @get('feature_artists')
      artists = new Backbone.Collection()
      artists.fetch
        url: "#{@url()}/features/artists"
        success: =>
          @set('feature_artists', artists)
          callback?(artists)
        error: (x,c,b)-> console.log(x,c,b)
    else
      callback?(@get('feature_artists'))
