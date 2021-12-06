Backbone = require 'backbone'
{ metaphysics2 } = require '../../../../../lib/metaphysics2'
query = require './query.coffee'
template = -> require('./index.jade') arguments...
sd = require("sharify").data

module.exports = class AuctionRegistrationsView extends Backbone.View
  events:
    'click .settings-auction-registration___button a': 'trackRegisterToBid'

  className: 'settings-auction-registrations'

  initialize: ({ @user }) ->
    @me = {}

  fetch: ->
    metaphysics2 query: query, req: user: @user
      .then ({ @me }) => @render()
      .catch console.error.bind(console)

  trackRegisterToBid: (e) ->
    window.analytics.track('Clicked "Register to bid"', {
      context_type: "settings",
      auction_slug: $(this)
        .attr("href")
        .split("/")[2],
      auction_state: "open",
      user_id: sd.CURRENT_USER && sd.CURRENT_USER.id,
    })

  render: ->
    @$el.html template
      sale_registrations: @me.sale_registrations?.edges.map (e) -> e.node
    this
