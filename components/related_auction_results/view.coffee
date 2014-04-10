_               = require 'underscore'
Backbone        = require 'backbone'
AuctionResults  = require '../../collections/auction_lots.coffee'
CurrentUser     = require '../../models/current_user.coffee'
mediator        = require '../../lib/mediator.coffee'

template = -> require('./template.jade') arguments...

module.exports = class RelatedAuctionResultsView extends Backbone.View
  template: template

  events:
    'click .related-auction-result' : 'clickResult'

  initialize: (options = {}) ->
    { @artistId, @amount } = _.defaults(options, amount: 4)

    throw new Error('Requires an artist ID') unless @artistId

    @user = CurrentUser.orNull()

    @fetchAndRender()

  clickResult: (e) ->
    return if @user
    e.preventDefault()
    mediator.trigger 'open:auth', mode: 'register', copy: 'Sign up to see full auction records — for free'

  fetchAndRender: ->
    @auctionResults = new AuctionResults [], id: @artistId, sortBy: '-price_realized_dollar,-auction_date'
    @listenTo @auctionResults, 'sync', @render
    @auctionResults.setPageSize @amount # Fetches

  render: ->
    # Only use results that have images
    results = _.first @auctionResults.resultsWithImages(), 2

    @$el.
      html(template auctionResults: results, artistId: @artistId).
      addClass 'is-fade-in'
