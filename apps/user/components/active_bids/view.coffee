Backbone = require 'backbone'
metaphysics = require '../../../../lib/metaphysics.coffee'
query = require '../../../../components/my_active_bids/query.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ActiveBidsView extends Backbone.View
  initialize: ({ @user }) ->
    @me = {}

  fetch: ->
    metaphysics query: query, req: user: @user
      .then ({ @me }) => @render()

  render: ->
    @$el.html template
      myActiveBids: @me.bidder_positions
    this
