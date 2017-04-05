_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap'
Backbone = require 'backbone'
FairEntries = require '../../../collections/fair_entries'
PoliteInfiniteScrollView = require '../../../components/polite_infinite_scroll/client/view'
sd = require('sharify').data

fairEntriesTemplate = -> require('../templates/fair_entries.jade') arguments...

module.exports.FeedView = class FeedView extends PoliteInfiniteScrollView
  events:
    'click .refresh-icon' : 'refresh'

  onSync: => @render()

  refresh: ->
    @$('#fair-feed__list').html ""
    @showSpinner()
    @collection.fetch data: size: @params.size

  render: ->
    if @collection.length > 0
      @$('#fair-feed__list').html fairEntriesTemplate entries: @collection.models
      @$('#fair-feed__empty-message').hide()
    else
      @$('#fair-feed__empty-message').show()

    @hideSpinner()


module.exports.init = ->
  bootstrap()

  entries = new FairEntries

  new FeedView
    el: $ 'body'
    collection: entries
    params:
      size: 30
