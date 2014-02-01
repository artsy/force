_                       = require 'underscore'
Backbone                = require 'backbone'
Genes                   = require '../../../collections/genes.coffee'
sd                      = require('sharify').data
FillwidthView           = require '../../../components/fillwidth_row/view.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
itemTemplate            = -> require('../templates/follows_item.jade') arguments...
hintTemplate            = -> require('../templates/empty_hint.jade') arguments...
Artist                  = require '../../../models/artist.coffee'
Gene                    = require '../../../models/gene.coffee'
SuggestedGenesView      = require '../../../components/suggested_genes/view.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

kindToModel = artist: Artist, gene: Gene

module.exports.FollowsView = class FollowsView extends Backbone.View

  initialize: (options) ->
    @followItems  = @collection # More readable alias
    @pageNum      = 0           # Last page loaded
    @itemsPerPage = options.itemsPerPage or 10
    @setupCurrentUser()
    @setupFollowsItems()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  setupFollowsItems: ->
    @followItems.fetchUntilEnd success: (col) =>
      @$('.follows .loading-spinner').hide()
      @showEmptyHint() unless @followItems.length > 0
      if @followItems.length > @itemsPerPage
        $(window).bind 'scroll.following', _.throttle(@infiniteScroll, 150)
      @loadNextPage()

  loadNextPage: ->
    end = @itemsPerPage * (@pageNum + 1)
    start = end - @itemsPerPage
    return unless @followItems.length > start

    showingItems = @followItems.slice start, end
    _.each showingItems, (item) =>
      model = new kindToModel[item.kind] item.get(item.kind)
      @appendItemSkeleton(model)
      @showItemContent(model)
    ++@pageNum

  infiniteScroll: =>
    $(window).unbind('.following') unless @pageNum * @itemsPerPage < @followItems.length
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.follows > .follows-item:last')
    @loadNextPage() unless fold < $lastItem.offset()?.top + $lastItem.height()

  showEmptyHint: () ->
    @$('.follows-empty-hint').html $( hintTemplate type: sd.TYPE )
    (new SuggestedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

  # Append the item with name, spinner, etc (without content) to the container
  #
  # So that we can display some stuff to users asap.
  # @param {Object} followItem an item from the followItems collection
  appendItemSkeleton: (followItem) ->
    @$('.follows').append $( itemTemplate item: followItem )

  # Display item content
  #
  # The function assumes the skeleton (container) of this item already exists.
  # @param {Object} followItem an item from a followItems collection
  showItemContent: (followItem) =>
    followItem.fetchArtworks success: (artworks) =>
      $container = @$("##{followItem.get('id')}")
      $followButton = $container.find(".follow-button")
      $artworks = $container.find('.artworks')
      view = new FillwidthView
        artworkCollection: @artworkCollection
        fetchOptions: { 'filter[]': 'for_sale' }
        collection: artworks
        empty: (-> @$el.parent().remove() )
        el: $artworks
      view.render()
      new FollowButton
        following: @followItems
        model: followItem
        el: $followButton
      _.defer ->
        view.hideFirstRow()
        view.removeHiddenItems()

module.exports.init = ->
  new FollowsView
    collection: new Following null,
      kind: sd.KIND
      comparator: (item) -> item.get(item.kind).name or ""
    el: $('body')
    itemsPerPage: 10
