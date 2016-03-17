Backbone = require 'backbone'
query = require './query.coffee'
metaphysics = require '../../lib/metaphysics.coffee'
myActiveBidsTemplate = -> require('./my_active_bids/template.jade') arguments...

module.exports = class MyActiveBids extends Backbone.View

  template: myActiveBidsTemplate

  initialize: ({ template, interval = 1000 }) ->
    @template = template if template
    @user = CurrentUser.orNull()
    @interval = setInterval @fetchAndRender, interval

  remove: ->
    clearInterval @interval

  fetchAndRender: ->
    metaphysics(query: query, req: user: user).then (data) ->
      $('el').html myActiveBidsTemplate(myActiveBids: data.me.bidder_positions)
