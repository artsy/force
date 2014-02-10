_               = require 'underscore'
AdditionalImage = require '../../models/additional_image.coffee'
Backbone        = require 'backbone'
CurrentUser     = require '../../models/current_user.coffee'
SaveControls    = require '../artwork_item/save_controls.coffee'
artworkColumns  = -> require('./template.jade') arguments...
artworkItem     = -> require('../artwork_item/template.jade') arguments...

module.exports = class ArtworkColumns extends Backbone.View

  # Configureable Defaults
  seeMore         : false
  numberOfColumns : 3
  initialItemCount: 10
  maxArtworkHeight: 400
  currentColumn   : 0
  isOrdered       : false
  totalWidth      : 1120
  gutterWidth     : 80
  artworkSize     : 'tall'

  events:
    'click .artwork-columns-see-more': 'onSeeMoreClick'

  initialize: (options) ->
    _.extend @, options

    unless @collection and @collection.groupByColumnsInOrder
      throw 'You must pass an Artworks collection'

    unless @collectionLength
      @collectionLength = @collection.length

    @columnWidth = Math.floor((@totalWidth - ((@numberOfColumns - 1) * @gutterWidth)) / @numberOfColumns)

    @seeMore = (@seeMore and @collectionLength > @initialItemCount)
    @numberOfColumns ||= 3

    @indices = [0...@numberOfColumns]
    @columns = []
    for index in @indices
      @columns[index] = { height: 0, artworkCount: 0 }
    @shortestColumn = 0

    @setUserSavedArtworks()
    @render()

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

    # Set some styles according to view params
    @$el
      .css('width', "#{@totalWidth}px")
      .find('.artwork-column').css
        'margin-left': "#{Math.floor(@gutterWidth / 2)}px"
        'margin-right': "#{Math.floor(@gutterWidth / 2)}px"
        width: "#{@columnWidth}px"

    @$el.find('.artwork-column:first-child').css('margin-left', '0')
    @$el.find('.artwork-column:last-child').css('margin-right', '0')

    @appendArtworks @collection.models

    if @seeMore
      _.each(@collection.rest(@initialItemCount), ((artwork) =>
        @$el.find("figure[data-artwork='#{artwork.get('id')}']").hide()))

  # Render artworks to each column (shortest first)
  appendArtworks: (artworks) ->
    for artwork in artworks
      $artwork = if @isOrdered then @addToNextColumn(artwork) else @addToShortestColumn(artwork)
      new SaveControls
        artworkCollection: @artworkCollection
        model: artwork
        el: $artwork.find('.overlay-container')
    if @artworkCollection
      @artworkCollection.addRepoArtworks @collection
      @artworkCollection.syncSavedArtworks()

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
    img = artwork.defaultImage()
    height = img.maxHeightForWidth @columnWidth, @maxArtworkHeight
    $artwork = @appendFigure artwork, @shortestColumn, notes
    @columns[@shortestColumn].height += height
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
