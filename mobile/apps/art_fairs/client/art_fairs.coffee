bootstrap = require '../../../components/layout/bootstrap.coffee'
AvantGardeTabsView = require '../../../components/avant_garde_tabs/view.coffee'
Helpers = require '../helpers.coffee'
pastFairsTemplate = -> require('../templates/past-fairs.jade') arguments...
sd = require('sharify').data
Backbone = require 'backbone'
query = require '../query.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'

module.exports.FairsView = class FairsView extends Backbone.View
  events:
    'click #paginate-past-fairs' : 'maybeFetchAndRenderPastFairs'

  initialize: (options) ->
    { @fairs } = options
    @page = 2
    @doneFetching = false

  maybeFetchAndRenderPastFairs: ->
    # If we have less than 12 (2 visible pages worth), try to fetch more
    if @fairs.length < 12 and not @doneFetching
      metaphysics
        variables: page: @page, size: 50
        query: query
      .then (data) =>
        if data.fairs?.length == 0
          @doneFetching = true
        else
          @fairs = @fairs.concat(data.fairs)
          @page++
          @renderTemplate()

    @renderTemplate()

  renderTemplate: ->
    @pastFairs = _.first(@fairs, 6)
    @fairs = _.rest(@fairs, 6)
    @$('#paginate-past-fairs').remove()
    @$('.past-fairs').append pastFairsTemplate
      pastFairs: @pastFairs
      Helpers: Helpers
      remainingPastFairs: @fairs

module.exports.init = ->
  bootstrap()
  new AvantGardeTabsView
    el: $ '#art-fairs-page'
  new FairsView
    el: $ '#art-fairs-page'
    fairs: sd.PAST_FAIRS
