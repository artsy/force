_ = require 'underscore'
moment = require 'moment'
{ Markdown, Image } = require 'artsy-backbone-mixins'
{ SECURE_IMAGES_URL } = require('sharify').data
Sale = require './sale.coffee'
ImageSizes = require './mixins/image_sizes.coffee'

module.exports = class Auction extends Sale
  _.extend @prototype, Markdown
  _.extend @prototype, Image(SECURE_IMAGES_URL)
  _.extend @prototype, ImageSizes

  parse: (response) ->
    response.auction_state = @calculateAuctionState response.start_at, response.end_at
    response

  href: ->
    "/auction/#{@id}"

  registrationSuccessUrl: ->
    "#{@href()}/confirm-registration"

  buyersPremiumUrl: ->
    "#{@href()}/buyers-premium"

  calculateAuctionState: (start_at, end_at, offset = 0) ->
    start = moment(start_at).add(offset, 'milliseconds')
    end = moment(end_at).add(offset, 'milliseconds')
    if moment().isAfter(end) or moment().isSame(end)
      'closed'
    else if moment().isBetween(start, end)
      'open'
    else if moment().isBefore(start) or moment().isSame(start)
      'preview'

  auctionState: ->
    @calculateAuctionState _.values(@pick('start_at', 'end_at', 'offset'))...
