_                 = require 'underscore'
Backbone          = require 'backbone'
sd                = require('sharify').data
Profile           = require('./profile.coffee')
Artwork           = require('./artwork.coffee')
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

  reposts: -> new Reposts(@get('reposts'))

  ensureRepostsFetched: (callback) ->
    if @get('reposts_count') > 0 and not @get('reposts')
      collection = new Backbone.Collection
        url: "/api/v1/reposts"
      collection.fetch
        url: "/api/v1/reposts"
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
    model = new Backbone.Model
      url: "/api/v1/repost"
    model.save
      data:
        post_id: @get('id')
      success: (data, status, xhr) =>
        @get('reposts').push data
        options?.success(data, status, xhr)
      error: options?.error

  unrepost: (repost, options) ->
    model = new Backbone.Model
      id: repost.get('id')
      urlRoot: "/api/v1/repost"
    model.destroy
      success: options?.success
      error: options?.error
