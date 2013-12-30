Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Image = require './mixins/image.coffee'

module.exports = class Artwork extends Backbone.Model

  _.extend @prototype, Image

  urlRoot: -> "#{sd.ARTSY_URL}/api/v1/artwork"

  defaultImageUrl: (version = 'medium') ->
    @fullyQualifiedImageUrl(@get('images')?[0]?.image_url.replace(':version', version) ? '')

  isSaved: (artworkCollection) ->
    artworkCollection && artworkCollection.isSaved(@)

  hasWebsite: ->
    !!@get('website')

  hasCollectingInstitution: ->
    @get('collecting_institution')?.length > 0

  partnerName: ->
    if @hasCollectingInstitution()
      @get('collecting_institution')
    else if @get('partner')?
      @get('partner').name
    else
      ""
  partnerLink: ->
    partner = @get('partner')
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
      if @get('title')? and @get('title').length > 0 then "<em>#{@get('title')}</em>" else null,
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
      (if @get('date') then "(#{date})" else undefined),
    ]).join(" ")

  toTitleWidthDateForSale: ->
    _.compact([
      toTitleWithDate()
      (if @get('forsale') then 'Available for Sale' else undefined)
    ]).compact.join(", ")

  toPageTitle: ->
    _.compact([
      @get('artist')?.name,
      @toTitleWithDateForSale(),
     "Artsy"
    ]).compact.join(" | ")

  toAuctionResultsPageTitle: ->
    _.compact([
      (if @get('artist')?.name then "#{@get('artist').name}#{',' if @get('title')}" else undefined)
      @toTitleWithDate()
      (if @get('artist')?.name or @get('title') then "| Related Auction Results" else "Related Auction Results")
      "| Artsy"
    ]).compact.join(" ")

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
    _.compact([@partnerDescription(),
     @get('artist')?.name ? @get('artist').name : undefined,
     @toTitleWithDate(),
     @get('medium'),
     @get('dimensions')
    ]).join(", ")

  # for meta descriptions
  toAuctionResultsPageDescription: ->
    "Related auction results for #{@toPageDescription()}"
