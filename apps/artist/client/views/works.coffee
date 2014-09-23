_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
mediator = require '../../../../lib/mediator.coffee'
splitTestInterface = require '../split_test.coffee'
Sticky = require '../../../../components/sticky/index.coffee'
Artworks = require '../../../../collections/artworks.coffee'
ArtworkFilter = require '../../../../components/artwork_filter/index.coffee'
FillwidthView = require '../../../../components/fillwidth_row/view.coffee'
BorderedPulldown = require '../../../../components/bordered_pulldown/view.coffee'
template = -> require('../../templates/sections/works.jade') arguments...

module.exports = class WorksView extends Backbone.View
  subViews: []

  events:
    'click .artist-works-sort a': 'onSortChange'

  initialize: (options) ->
    { @user } = options
    @sortBy = sd.SORT_BY
    @sticky = new Sticky

  setupSplitTest: ->
    if splitTestInterface() is 'fillwidth'
      @setupArtworksFillwidth()
    else
      @setupArtworkFilter()

  setupArtworksFillwidth: ->
    @artworkCollection = @currentUser?.defaultArtworkCollection()
    @fadeInSection @$('#artist-fillwidth-section')
    @subViews.push new BorderedPulldown el: @$('.bordered-pulldown')
    # Available Works
    $availableWorks = @$('#artist-available-works')
    @availableArtworks = new Artworks
    @availableArtworks.url = "#{@model.url()}/artworks"
    @setupFillwidth $availableWorks, @availableArtworks, 'filter[]': 'for_sale'
    # Works at Museums/Institutions
    $institutionalWorks = @$('#artist-institution-works')
    @institutionArtworks = new Artworks
    @institutionArtworks.url = "#{@model.url()}/artworks"
    @setupFillwidth $institutionalWorks, @institutionArtworks, 'filter[]': 'not_for_sale'

  setupFillwidth: ($el, collection, options = {}) ->
    fetchOptions = _.defaults options, sort: (@sortBy or undefined), published: true
    subView = new FillwidthView
      artworkCollection: @artworkCollection
      fetchOptions: fetchOptions
      collection: collection
      seeMore: true
      empty: (-> @$el.parent().remove())
      el: $el
    subView.nextPage false, 10
    @subViews.push subView
    subView

  onSortChange: (e) ->
    @sortBy = $(e.currentTarget).data('sort')
    @setupArtworksFillwidth()

  fadeInSection: ($el) ->
    $el.show()
    _.defer -> $el.addClass 'is-fade-in'
    $el

  setupArtworkFilter: ->
    # Need to resolve issues with changing heights and sticky not getting correct height
    # @listenToOnce mediator, 'artwork_filter:filter:sync', (model) ->
    #   # Once the filter height is apparent
    #   @sticky.add @$('#artwork-filter')
    # @listenTo filterRouter.view.artworks, 'sync', @sticky.rebuild
    filterRouter = ArtworkFilter.init el: @$('#artwork-section'), model: @model, mode: 'infinite'
    @subViews.push filterRouter.view
    $.onInfiniteScroll ->
      filterRouter.view.loadNextPage()

  postRender: ->
    @setupSplitTest()

  render: ->
    @$el.html template(artist: @model, sortBy: @sortBy)
    _.defer => @postRender()
    this

  remove: ->
    $(window).off 'infiniteScroll'
    _.invoke @subViews, 'remove'
