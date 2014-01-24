_                 = require 'underscore'
Backbone          = require 'backbone'
sd                = require('sharify').data
Profile           = require('./profile.coffee')
Artwork           = require('./artwork.coffee')
Attachments       = require('../collections/post_attachments.coffee')
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
