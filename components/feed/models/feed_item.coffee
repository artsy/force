_ = require 'underscore'
Backbone = require 'backbone'
Post = require '../../../models/post.coffee'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
PartnerShow = require '../../../models/partner_show.coffee'
underscore = require('../../util/string.coffee').underscore
{ DOMPurify } = require 'dompurify'

module.exports = class FeedItem extends Backbone.Model

  childModels:
    PartnerShow: PartnerShow
    Post: Post

  defaults:
    top: 0
    bottom: 0
    height: 0
    index: 0
    active: false
    isAbove: false
    initialArtworkSize: 8

  parse: (response) ->
    response.title = DOMPurify.sanitize(response.title)
    response.body = DOMPurify.sanitize(response.body)
    response

  artworks: (max) =>
    if @isPost()
      artworks = @toChildModel()?.artworks()
    else
      artworks = new Artworks(@get('artworks'))
    if max then artworks[..max] else artworks

  flagged: -> @get('flagged')

  initialArtworks: ->
    if @isPost()
      # We don't want to hide works from a post with a show more. Return all of them.
      @artworks()
    else
      artworks = _.first(@get('artworks'), @get('initialArtworkSize'))
      new Artworks(artworks)

  toChildModel: =>
    if @get('_type')
      childModel = new @childModels[@get('_type')](@attributes)
      @childModel ?= childModel

  isPost: -> @get('_type') == 'Post'
  isPartnerShow: -> @get('_type') == 'PartnerShow'

  formatSeeMoreText: ->
    num = @get('eligible_artworks_count') - @get('initialArtworkSize')
    if num > 0
      stem = if num > 1 then 's' else ''
      "See #{num} More Artwork#{stem}"
