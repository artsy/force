_ = require 'underscore'
Backbone = require 'backbone'
{ Image } = require 'artsy-backbone-mixins'
{ Dimensions } = require 'artsy-backbone-mixins'

{ API_URL, SECURE_IMAGES_URL } = require('sharify').data

module.exports = class AuctionLot extends Backbone.Model
  urlRoot: "#{API_URL}/api/v1/auction_lot"

  _.extend @prototype, Dimensions
  _.extend @prototype, Image(SECURE_IMAGES_URL)

  href: (artist) ->
    "/artist/#{artist.id}/auction-result/#{@id}"

  # @return {Boolean}
  hasDimensions: ->
    (@get('dimensions')?.in or @get('dimensions')?.cm)?

  # Format: Auction Result for "Title" (Year) by Artist | Auction House, Auction Date | Artsy
  # (Often auction lots have an artist_name but it is commonly missing, so the artist is explicitly passed in)
  #
  # @return {String}
  toPageTitle: (artist) ->
    titleAndName = "\"#{@get('title') or 'Untitled'}\""
    titleAndName += " (#{@get('dates_text')})" if @get('dates_text')
    titleAndName += " by #{artist?.get('name')}" if artist?.get('name')
    organizationAndDate = @get('organization')
    organizationAndDate += ", #{@get('auction_dates_text')}" if @get('auction_dates_text')
    _.compact([
      "Auction Result for #{titleAndName}"
      organizationAndDate
      'Artsy'
    ]).join ' | '

  toPageDescription: ->
    artworkInfo = _.compact([
      @get('medium_text')
      @dimensions({ metric: 'in', format: 'decimal' })
    ]).join(', ')

    _.compact([
      artworkInfo
      "Estimate #{@get('estimate_text')} from #{@get('organization')} on #{@get('auction_dates_text')}"
      "Find auction estimate and sale price, and research more auction results from top auction houses."
    ]).join('. ')
