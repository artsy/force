_              = require 'underscore'
sd             = require('sharify').data
Backbone       = require 'backbone'
{ Image }      = require 'artsy-backbone-mixins'
{ Dimensions } = require 'artsy-backbone-mixins'

module.exports = class Artwork extends Backbone.Model

  _.extend @prototype, Image(sd.SECURE_IMAGES_URL)
  _.extend @prototype, Dimensions

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/artwork"

  defaultImage: -> @get('images')?[0]

  defaultImageUrl: (version = 'medium') ->
    return @missingImageUrl() unless _.contains @defaultImage()?.image_versions, version
    @defaultImage()?.image_url.replace(':version', version) ? ''

  isSaved: (artworkCollection) ->
    artworkCollection && artworkCollection.isSaved(@)

  hasWebsite: ->
    !!@get('website')

  hasCollectingInstitution: ->
    @get('collecting_institution')?.length > 0

  partnerName: ->
    if @hasCollectingInstitution()
      @get('collecting_institution')
    else if @has 'partner'
      @get('partner').name
    else
      ""

  href: ->
    "/artwork/#{@get('id')}"

  partnerLink: ->
    partner = @get 'partner'
    return unless partner
    if partner.default_profile_public && partner.default_profile_id
      return "/#{partner.default_profile_id}"
    if partner.website?.length > 0
      return partner.website

  partnerLinkTarget: ->
    linkType = @get('partner').linkType()
    if linkType == "external" then "_blank" else "_self"

  artistLink: -> "/artist/#{@get('artist').id}"

  getTitle: -> if @get('title') then @get('title') else '(Untitled)'

  titleAndYear: ->
    _.compact([
      if @get('title')? and @get('title').length > 0 then "<em>#{@get('title')}</em>" else '',
      @get('date')
    ]).join(", ")

  toAltText: ->
    _.compact([
      @get('title'),
      @get('date'),
      (if @get('artist')?.name then "by #{@get('artist')?.name}" else undefined)
    ]).join(", ")

  toTitleWithDate: ->
    _.compact([
      @get('title'),
      (if @get('date') then "(#{@get('date')})" else undefined),
    ]).join(" ")

  toTitleWithDateForSale: ->
    _.compact([
      @toTitleWithDate()
      (if @get('forsale') then 'Available for Sale' else undefined)
    ]).join(", ")

  toPageTitle: ->
    _.compact([
      @get('artist')?.name
      @toTitleWithDateForSale()
      "Artsy"
    ]).join(" | ")

  # same as .to_s in Gravity
  toOneLine: ->
    _.compact([
      @get('artist')?.name
      @toTitleWithDate()
    ]).join(" ")

  toAuctionResultsPageTitle: ->
    _.compact([
      (if @get('artist')?.name then "#{@get('artist').name}#{if @get('title') then ',' else ''}" else undefined)
      @toTitleWithDate()
      (if @get('artist')?.name or @get('title') then "| Related Auction Results" else "Related Auction Results")
      "| Artsy"
    ]).join(" ")

  titleByArtist: ->
    _.compact([
      if @get('title') then @get('title') else '(Untitled)'
      @get('artist')?.name
    ]).join(' by ')

  partnerDescription: ->
    return undefined unless @get('partner')?.name
    if @get('forsale') then "Available for sale from #{@get('partner').name}" else"From #{@get('partner').name}"

  # for meta descriptions
  toPageDescription: ->
    _.compact([
      @partnerDescription()
      (if @get('artist')?.name then @get('artist').name else undefined)
      @toTitleWithDate()
      @get('medium')
      @dimensions()
    ]).join(", ")

  # for meta descriptions
  toAuctionResultsPageDescription: ->
    "Related auction results for #{@toPageDescription()}"

  saleMessage: ->
    return undefined if @get('sale_message') is 'Contact For Price'
    @get 'sale_message'

  noPinAttr: ->
    if @get('can_share_image') then undefined else "nopin"
