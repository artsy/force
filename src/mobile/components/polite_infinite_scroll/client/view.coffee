#
# Polite Infinite Scroll View
#
# Generic view to be extended anywhere you need a collection view that
# starts infinite scrolling only after a "Show More" button is pressed
#
# This expects you to have an .is-show-more-button and a .loading-spinner
# outside and below your collection container.
#
# Don't forget to call super on your view's initialize!

_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class PoliteInfiniteScrollView extends Backbone.View

  initialize: (options)->
    { @params } = options if options
    @collection.on 'sync', @onSync
    @collection.fetch
      data: @params
      success: => @onInitialFetch()

    @$('.is-show-more-button').click =>
      @startInfiniteScroll()

  #
  # Called every time the collection is synced
  #
  onSync: -> # empty

  #
  # Called only when the collection is initially fetched
  #
  onInitialFetch: ->
    @showShowMoreButton()
    @hideSpinner()
    @onSync()

  #
  # Called when the end of the page is reached
  #
  onInfiniteScroll: -> # empty

  #
  # Called when the end of the collection is reached
  #
  onFinishedScrolling: ->
    @finishedScrolling = true
    @hideSpinner()
    $('html').removeClass 'infinite-scroll-is-active'

  startInfiniteScroll: ->
    @hideShowMoreButton()
    @showSpinner()
    $('html').addClass 'infinite-scroll-is-active'
    $.onInfiniteScroll => @onInfiniteScroll()

  showShowMoreButton: -> @$('.is-show-more-button').removeClass('is-hidden')

  hideShowMoreButton: -> @$('.is-show-more-button').addClass('is-hidden')

  showSpinner: -> @$('.loading-spinner').show()

  hideSpinner: -> @$('.loading-spinner').hide()
