get  = require 'lodash.get'
moment = require 'moment'
{ compact } = require 'underscore'
{ getLiveAuctionUrl } = require '../../../../../utils/domain/auctions/urls'
{ getBidderStatus } = require '../../../../../utils/domain/auctions/getBidderStatus'
{ getRedirectActionUrl } = require '../../../../../utils/domain/auctions/getBidRedirectActionUrl'

pluralize = (word, count, irregular = null) ->
  if count is 1
    "#{count} #{word}"
  else
    "#{count} #{irregular or word + 's'}"

module.exports = {
  getLiveAuctionUrl: getLiveAuctionUrl,
  getBidderStatus: getBidderStatus
  getRedirectActionUrl: getRedirectActionUrl

  count: ({ counts, reserve_message }) ->
    compact [
      pluralize 'bid', counts.bidder_positions if counts.bidder_positions
      reserve_message
    ]
      .join ', '
}
