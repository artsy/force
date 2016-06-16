sd = require('sharify').data
Backbone = require 'backbone'
query = require './query.coffee'
metaphysics = require '../../lib/metaphysics.coffee'
CurrentUser = require '../../models/current_user.coffee'
template = -> require('./template.jade') arguments...

module.exports = class MyActiveBids extends Backbone.View

  initialize: ({ @user, @saleId, @template = template }) ->

  start: ->
    @fetch().then => @render() and @poll()

  poll: =>
    @interval = setInterval(
      (=> @fetch().then @render)
      sd.ACTIVE_BIDS_POLL_INTERVAL
    )
    this

  fetch: ->
    metaphysics(
      query: query
      variables: current: true, sale_id: @saleId
      req: user: @user
    ).then (data) =>
      @bidderPositions = data.me.bidder_positions

  render: =>
    @$el.html @template myActiveBids: @bidderPositions
    this

  remove: ->
    clearInterval @interval
