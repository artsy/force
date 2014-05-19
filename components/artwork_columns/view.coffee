_               = require 'underscore'
AdditionalImage = require '../../models/additional_image.coffee'
Backbone        = require 'backbone'
CurrentUser     = require '../../models/current_user.coffee'
SaveControls    = require '../artwork_item/save_controls/view.coffee'
artworkColumns  = -> require('./template.jade') arguments...
artworkItem     = -> require('../artwork_item/templates/artwork.jade') arguments...
trackArtworkImpressions = require("../analytics/impression_tracking.coffee").trackArtworkImpressions

module.exports = class ArtworkColumns extends Backbone.View

  # Configureable Defaults
  seeMore         : false
  numberOfColumns : 3
  initialItemCount: 10
  maxArtworkHeight: 400
  currentColumn   : 0
  isOrdered       : false
  gutterWidth     : 80
  artworkSize     : 'tall'
  allowDuplicates : false

  events:
    'click .artwork-columns-see-more': 'onSeeMoreClick'

  initialize: (options) ->
    _.extend @, options

    unless @collection and @collection.groupByColumnsInOrder
      throw 'You must pass an Artworks collection'

    unless @collectionLength
      @collectionLength = @collection.length

    @columnWidth = @_columnWidth()

    @seeMore = (@seeMore and @collectionLength > @initialItemCount)
    @numberOfColumns ||= 3

    @indices = [0...@numberOfColumns]
    @columns = []
    for index in @indices
      @columns[index] = { height: 0, artworkCount: 0, artworkHeights: [] }
    @shortestColumn = 0

    @setUserSavedArtworks()
    @render()

    unless @totalWidth
      $(window).on 'resize', _.debounce @sizeColumns, 100

  _columnWidth: ->
    width = @totalWidth or @$el.width()
    Math.floor((width - ((@numberOfColumns - 1) * @gutterWidth)) / @numberOfColumns)

  sizeColumns: =>
    margin = Math.floor(@gutterWidth / 2)
    (@$columns ?= @$el.find('.artwork-column')).css
      marginLeft: "#{margin}px"
      marginRight: "#{margin}px"
      width: "#{@_columnWidth()}px"
    @$columns.filter(':first-child').css marginLeft: 0
    @$columns.filter(':last-child').css marginRight: 0

  setUserSavedArtworks: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  render: =>
    # Render columns and set some styles according to view params
    @$el
      .html artworkColumns
        numberOfColumns: @numberOfColumns
        buttonLabel    : @buttonLabel()
        seeMore        : @seeMore

    @sizeColumns()

    @appendArtworks @collection.models

    if @seeMore
      _.each(@collection.rest(@initialItemCount), ((artwork) =>
        @$el.find("figure[data-artwork='#{artwork.get('id')}']").hide()))

  # Render artworks to each column (shortest first)
  appendArtworks: (artworks) ->
    unless @allowDuplicates
      artworks = _.reject artworks, (a) => a.get('id') in @collection.pluck 'id'
      @collection.add(artworks)

    return unless artworks?.length

    for artwork in artworks
      $artwork = if @isOrdered then @addToNextColumn(artwork) else @addToShortestColumn(artwork)
      new SaveControls
        artworkCollection: @artworkCollection
        model: artwork
        el: $artwork.find('.overlay-container')
    if @artworkCollection
      @artworkCollection.addRepoArtworks @collection
      @artworkCollection.syncSavedArtworks()

    trackArtworkImpressions artworks, @$el

  buttonLabel: ->
    num = @collectionLength - @initialItemCount
    stem = if num > 1 then 's' else ''
    "See #{num} More Artwork#{stem}"

  addToNextColumn: (artwork, notes, displayAuctionPrice, estimate) ->
    $artwork = @appendFigure artwork, @currentColumn, notes, displayAuctionPrice, estimate
    @currentColumn = @currentColumn + 1
    @currentColumn = 0 if (@currentColumn > @columns.length - 1)
    $artwork

  addToShortestColumn: (artwork, notes) ->
    return unless @columns?.length > 0

    # If artwork is a jQuery node then assume it is already rendered and
    # just append it to the shortest column
    if artwork instanceof $
      $artwork = artwork
      @$(".artwork-column:eq(#{@shortestColumn})").append $artwork
      height = $artwork.find('img').height()
    else
      img       = artwork.defaultImage()
      height    = img.maxHeightForWidth @columnWidth, @maxArtworkHeight
      $artwork  = @appendFigure artwork, @shortestColumn, notes

    fullArtworkItemHeight = height + parseInt($artwork.find('.artwork-item-caption').css('height').replace('px', ''))
    @columns[@shortestColumn].height += fullArtworkItemHeight
    @columns[@shortestColumn].artworkHeights.unshift fullArtworkItemHeight
    @columns[@shortestColumn].artworkCount += 1
    @shortestColumn = _.reduce @indices, @reduceColumns, @shortestColumn, @
    $artwork

  # Determines the shortest column according to image height
  reduceColumns: (min, index) ->
    if @columns[min].height < @columns[index].height
      return min
    else if @columns[min].height > @columns[index].height
      return index
    else
      if @columns[min].artworkCount > @columns[index].artworkCount
        return index
    return min

  appendFigure: (artwork, column, notes, displayAuctionPrice, estimate) ->
    # NOTE: The artwork item template ignores all of these, but will need to
    # work with them soon, so I'm going to leave these in.
    renderedArtwork = artworkItem
      artwork             : artwork
      fixedWidth          : @columnWidth
      maxDimension        : @maxArtworkHeight
      notes               : (if @displayNotes && notes then notes)
      displayBid          : @displayBid
      isAuction           : @isAuction
      displayPurchase     : @displayPurchase
      displaySold         : @displaySold
      displayMoreInfo     : @displayMoreInfo
      displayAuctionPrice : displayAuctionPrice
      estimate            : estimate
      artworkSize         : @artworkSize
    $renderedArtwork = $(renderedArtwork)
    @$(".artwork-column:eq(#{column})").append $renderedArtwork
    $renderedArtwork

  onSeeMoreClick: =>
    @$el.find(".artwork-item:not(:visible)").fadeIn('fast')
    @$el.find(".artwork-columns-see-more").hide()

  columnHeight: (index) ->
    parseInt(@$(".artwork-column:eq(#{index})").css('height').replace('px',''))

  rebalance: (newHeight, index) ->
    return if @isOrdered
    # Figure out how many artworks need to be removed from the modified column
    total = 0
    idx = 0
    for height in @columns[index].artworkHeights
      total += height
      idx += 1
      break if total > newHeight

    # Pop off the artworks that need to be removed
    $lastElements = @$(".artwork-column:eq(#{index})").find('.artwork-item').slice(-idx)

    removedArtworks = _.map $lastElements, (elem) =>
      id = $(elem).attr('data-artwork')
      @$("figure[data-artwork='#{id}']").detach()

    # Recalc column height
    @columns[index].height = @columnHeight(index)

    # Readd artworks to shortest columns
    for artwork in removedArtworks
      @addToShortestColumn(artwork)
