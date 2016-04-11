_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
Artworks = require '../../../../collections/artworks.coffee'
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
BorderedPulldown = require '../../../../components/bordered_pulldown/view.coffee'
template = -> require('../../templates/sections/works.jade') arguments...

module.exports = class WorksView extends Backbone.View
  subViews: []

  initialize: ({ @user, @statuses }) ->
    @sticky = new Sticky

    $.onInfiniteScroll =>
      return if not @filterView
      if @filterView.remaining() is 0
        $('#main-layout-footer').css(display: 'block', opacity: 1)
        @fadeInSections()
        $.destroyInfiniteScroll()
      else
        @filterView.loadNextPage()
    , offset: 2 * $(window).height()

  setupArtworkFilter: ->
    filterRouter = ArtworkFilter.init
      el: @$('#artwork-section')
      model: @model
      mode: 'grid'
      showSeeMoreLink: false
    @subViews.push filterRouter.view
    @sticky.headerHeight = $('#main-layout-header').outerHeight(true) +

    @filterView = filterRouter.view

    $('.artist-sticky-header-container').outerHeight(true) + 20
    $('#main-layout-footer').css(display: 'none', opacity: 0)

    @listenTo @filterView.artworks, 'sync', @fetchWorksToFillPage
    @listenToOnce @filterView.artworks, 'sync', ->
      @sticky.headerHeight = $('#main-layout-header').outerHeight(true) +
      $('.artist-sticky-header-container').outerHeight(true) + 20
    @sticky.add @$('#artwork-filter-selection')

  # A new page of artworks may not reach all the way to the bottom of the window, but the next fetch
  # won't be triggered until next scroll.
  fetchWorksToFillPage: ->
    @sticky.rebuild()
    _.defer =>
      viewportBottom = $(window).scrollTop() + $(window).height()
      viewBottom = @$('#artwork-section').height() + @$('#artwork-section').scrollTop()
      bottomInView = viewBottom <= viewportBottom
      @filterView.loadNextPage() if bottomInView

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  postRender: ->
    @setupArtworkFilter()

  render: ->
    @$el.html template hasWorks: @statuses.artworks
    _.defer => @postRender()
    this

  remove: ->
    $(window).off 'infiniteScroll'
    _.invoke @subViews, 'remove'
