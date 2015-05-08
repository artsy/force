_ = require 'underscore'
Backbone = require 'backbone'
Artwork = require '../../../models/artwork.coffee'
Artworks = require '../../../collections/artworks.coffee'
PartnerShow = require '../../../models/partner_show.coffee'
underscore = require('../../util/string.coffee').underscore
DOMPurify = require 'dompurify'

module.exports = class FeedItem extends Backbone.Model

  childModels:
    PartnerShow: PartnerShow

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
      # DOMPurify replaces normal ampersands with HTML entities.
      # *I think* Jade should render HTML entities without having to completely unescape but...
      # https://github.com/visionmedia/jade/issues/966
      # We can't completely unescape because that template is sometimes rendered on the server
      # and we don't have a server-side sanitization solution, yet.
      ?.replace(' &amp; ', ' & ')
    response.body = DOMPurify.sanitize(response.body)
    response

  artworks: (max) =>
    artworks = new Artworks(@get('artworks'))

  flagged: -> @get('flagged')

  initialArtworks: ->
    @artworks()

  toChildModel: =>
    if @get('_type')
      childModel = new @childModels[@get('_type')](@attributes)
      @childModel ?= childModel

  isPartnerShow: -> @get('_type') == 'PartnerShow'

  formatSeeMoreText: ->
    num = @get('eligible_artworks_count') - @get('initialArtworkSize')
    if num > 0
      stem = if num > 1 then 's' else ''
      "See #{num} More Artwork#{stem}"
