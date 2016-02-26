Backbone = require 'backbone'
metaphysics = require '../../../../lib/metaphysics.coffee'
query = require './query.coffee'
template = -> require('./index.jade') arguments...

module.exports = class AuctionRegistrationsView extends Backbone.View
  className: 'settings-auction-registrations'

  initialize: ({ @user }) ->
    @me = {}

  fetch: ->
    metaphysics query: query, req: user: @user
      .then ({ @me }) => @render()
      .catch console.error.bind(console)

  render: ->
    @$el.html template
      sale_registrations: @me.sale_registrations
    this
