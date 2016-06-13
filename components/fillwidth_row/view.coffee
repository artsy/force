_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
SaveControls = require('../artwork_item/save_controls.coffee')
sd = require('sharify').data

module.exports = class FillwidthView extends Backbone.View

  initialize: (options) ->
    { @seeMore, @fetchOptions, @artworkCollection, @empty, @context_page, @context_module } = options
    @page = 1
    @fetched = 0
    @listenTo @collection, 'request', @renderSpinner
    @listenTo(@collection, 'sync', @render) unless options.doneFetching
    @

  renderSpinner: ->
    @$('.fillwidth-see-more').attr 'data-state', 'loading'

  render: =>
    return @empty?() if @collection.length < 1
    @$el.html template artworks: @collection.models, seeMore: @seeMore, imageWidth: 260
    maxHeight = parseInt(@$('img').first().css('max-height')) or 260
    @$('li').css 'min-height': maxHeight + 90
    @$('li .artwork-item-image-container').height maxHeight
    @$('ul').fillwidth
      imageDimensions: @collection.fillwidthDimensions(maxHeight)
    _.defer => @handleSeeMore() if @seeMore
    @initializeArtworks @collection
    this

  initializeArtworks: (artworks) ->
    $list = @$('.artwork-item')
    return unless $list.length > 0
    listItems =
      for artwork, index in artworks.models
        new SaveControls
          artworkCollection: @artworkCollection
          model: artwork
          el: $($list[index]).find('.overlay-container')
          context_page: @context_page
          context_module: @context_module

    @syncSavedArtworks(artworks) if @artworkCollection

  syncSavedArtworks: (artworks) ->
    @artworkCollection.addRepoArtworks artworks
    _.delay (=> @artworkCollection.syncSavedArtworks()), 500

  handleSeeMore: ->
    if @page is 2
      @hideThirdRow()

    if @collection.models.length < @fetched and @$('.fillwidth-row-uninitialized:hidden').length < 1
      @hideSeeMore()

  hideSeeMore: ->
    @$('.fillwidth-see-more').hide()

  hideSecondRow: =>
    firstItem = @$('li').first()
    firstItemTop = firstItem.offset().top if firstItem.length
    @$('li').each ->
      $item = $(@)
      $item.hide() if $item.offset().top > firstItemTop

  hideThirdRow: =>
    firstItem = @$('li').first()
    firstRowTop = firstItem.offset().top if firstItem.length
    secondRowTop = -1

    @$('li').each ->
      $item = $(@)
      itemOffsetTop = $item.offset().top

      if secondRowTop > 0
        $(@).hide() if itemOffsetTop > secondRowTop
      else if secondRowTop < 0 and itemOffsetTop > firstRowTop
        secondRowTop = itemOffsetTop

  events:
    'click .fillwidth-see-more': 'nextPage'

  nextPage: (evt, size=10) ->
    @fetched += size
    @collection.fetch
      remove: false
      data: _.extend { size: size, page: @page++ }, @fetchOptions

  # Remove items that are not shown to reduce DOM footprint
  removeHiddenItems: ->
    @$('li:hidden').remove()
