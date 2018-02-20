get = require 'lodash.get'
moment = require 'moment'
{ groupBy, sortBy } = require 'underscore'
{ getBidderStatus } = require '../../../utils/domain/auctions/getBidderStatus'
{ getBidRedirectActionUrl, getLiveAuctionUrl } = require '../../../utils/domain/auctions/urls'

module.exports =
  groupBy: groupBy
  getBidderStatus: getBidderStatus
  getLiveAuctionUrl: getLiveAuctionUrl
  getBidRedirectActionUrl: getBidRedirectActionUrl
  moment: moment

  sortExhibitions: (shows) ->
    sortBy(shows, 'start_at').reverse()

  date: (field) ->
    moment(new Date field)
