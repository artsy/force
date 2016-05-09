_ = require 'underscore'
Q = require 'bluebird-q'
fs = require 'fs'
request = require 'superagent'
Backbone = require 'backbone'
ReferrerParser = require 'referer-parser'
{ APPLICATION_NAME, NODE_ENV } = require '../../config'
cache = require '../../lib/cache'
Artist = require '../../models/artist'
Nav = require './nav'
metaphysics = require '../../lib/metaphysics'
query = require './query'
helpers = require './view_helpers'
currentShowAuction = require './components/current_show_auction/index'

@index = (req, res, next) ->
  metaphysics
    query: query
    variables: artist_id: req.params.id
  .then ({artist}) ->
    if req.params.tab is 'auction-results'
      return next() unless req.user?.hasLabFeature 'Other Auction Lot Providers'
      return next() unless artist.display_auction_link

    nav = new Nav artist: artist, auctionLotLabFeature: req.user?.hasLabFeature 'Other Auction Lot Providers'

    if (req.params.tab? or artist.href is res.locals.sd.CURRENT_PATH)
      res.locals.sd.ARTIST = artist
      res.locals.sd.TAB = tab = req.params.tab or ''
      if currentItem = currentShowAuction(artist)
        if currentItem.type is 'auction'
          currentItem.detail = "&nbsp;"
        else
          currentItem.detail = helpers.formatShowDetail currentItem

      res.locals.sd.CURRENT_SHOW_AUCTION = currentItem

      res.render 'index',
        viewHelpers: helpers
        artist: artist
        tab: tab
        nav: nav
        currentItem: currentItem

    else
      res.redirect artist.href

  .catch (err) -> next(err if NODE_ENV is 'development')
  .done()

@tab = (req, res, next) =>
  req.params.tab = res.locals.sd.CURRENT_PATH.split('/').pop()
  @index req, res, next

@follow = (req, res) ->
  return res.redirect "/artist/#{req.params.id}" unless req.user
  req.user.followArtist req.params.id,
    error: res.backboneError
    success: ->
      res.redirect "/artist/#{req.params.id}"
