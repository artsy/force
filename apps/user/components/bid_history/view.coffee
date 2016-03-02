Backbone = require 'backbone'
metaphysics = require '../../../../lib/metaphysics.coffee'
query = require './query.coffee'
template = -> require('./index.jade') arguments...

module.exports = class BidHistoryView extends Backbone.View
  className: 'settings-bid-history'

  initialize: ({ @user }) ->
    @me = {}

  fetch: ->
    metaphysics query: query, req: user: @user
      .then ({ @me }) => @render()

  render: ->
    @$el.html template
      button: false
      myActiveBids: @me.bidder_positions
    this
