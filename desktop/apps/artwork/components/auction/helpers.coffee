get  = require 'lodash.get'
{ compact } = require 'underscore'
{ liveAuctionUrl } = require '../../../../../utils/domain/auctions/urls'

pluralize = (word, count, irregular = null) ->
  if count is 1
    "#{count} #{word}"
  else
    "#{count} #{irregular or word + 's'}"

module.exports = {
  liveAuctionUrl,
  getBidderStatus: (me, auction) ->

    # Due to falsy behavior we need to check for the existence of a
    # qualified_for_bidding key and then check its value. This handles conditions
    # where we want to display the "Bid Now" button, but only to trigger a
    # login modal or redirect to register transition for the user.
    foundQualifiedForBiddingKey = get(me, 'bidders.0', {}).hasOwnProperty('qualified_for_bidding')

    if foundQualifiedForBiddingKey
      isQualified = get(me, 'bidders.0.qualified_for_bidding')

      if isQualified
        'qualified-to-bid'
      else
        'registration-pending'
    else if me && auction.require_bidder_approval
      'registration-required'
    else if me
      'logged-in'
    else
      'logged-out'

  getRedirectActionUrl: (bidderStatus, artwork, auction) ->
    if bidderStatus == 'qualified'
      "/auction/#{auction.id}/bid/#{artwork.id}"
    else
      "/artwork/#{artwork.id}"

  count: ({ counts, reserve_message }) ->
    compact [
      pluralize 'bid', counts.bidder_positions if counts.bidder_positions
      reserve_message
    ]
      .join ', '
}
