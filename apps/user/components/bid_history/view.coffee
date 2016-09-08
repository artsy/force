Backbone = require 'backbone'
metaphysics = require '../../../../lib/metaphysics.coffee'
query = require '../../../../components/my_active_bids/query.coffee'
template = -> require('./index.jade') arguments...

module.exports = class BidHistoryView extends Backbone.View
  className: 'settings-bid-history'

  initialize: ({ @user }) ->
    @me = {}

  fetch: ->
    metaphysics
      query: query
      variables: live: false
      req: user: @user

    .then ({ @me }) =>
      @render()

  render: ->
    @$el.html template
      button: false
      myActiveBids: @me.lot_standings
    this
