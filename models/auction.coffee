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

  formatDateRange: (start_attr, end_attr, format = 'dddd, MMM. Do h:mma') ->
    start = moment @get(start_attr)
    end = moment @get(end_attr)
    if start.isSame(end, 'day')
      "#{start.format(format)}–#{end.format('h:mma')}"
    else
      "#{start.format(format)}–#{end.format(format)}"

  isPreliminaryAuction: ->
    @get('is_auction') and @get('is_preliminary')

  isAuctionPromoInquirable: ->
    @isAuctionPromo() and @isPreview()
