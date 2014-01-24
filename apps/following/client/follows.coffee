_                       = require 'underscore'
Backbone                = require 'backbone'
Genes                   = require '../../../collections/genes.coffee'
sd                      = require('sharify').data
FillwidthView           = require '../../../components/fillwidth_row/view.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FollowButton            = require './follow_button.coffee'
itemTemplate            = -> require('../templates/follows_item.jade') arguments...
hintTemplate            = -> require('../templates/empty_hint.jade') arguments...
recTemplate             = -> require('../templates/recommendation.jade') arguments...
FollowArtists           = require '../../../collections/follow_artists.coffee'
FollowGenes             = require '../../../collections/follow_genes.coffee'
RecommendedGenesView    = require '../../../components/recommended_genes/view.coffee'

module.exports.FollowsView = class FollowsView extends Backbone.View

  initialize: (options) ->
    @followItems  = @model  # More readable alias
    @pageNum      = 0       # Last page loaded
    @itemsPerPage = options.itemsPerPage or 10
    @setupCurrentUser()
    @setupFollowsItems()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  setupFollowsItems: ->
    @followItems.syncFollows? [], success: (col) =>
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
      @appendItemSkeleton(item)
      @showItemContent(item)
    ++@pageNum

  infiniteScroll: =>
    $(window).unbind('.following') unless @pageNum * @itemsPerPage < @followItems.length
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.follows > .item:last')
    @loadNextPage() unless fold < $lastItem.offset()?.top + $lastItem.height()

  showEmptyHint: () ->
    @$('.follows-empty-hint').html $( hintTemplate type: sd.TYPE )
    (new RecommendedGenesView
      el: @$('.suggested-genes')
      user: @currentUser
    ).render()

  # Append the item with name, spinner, etc (without content) to the container
  #
  # So that we can display some stuff to users asap.
  # @param {Object} followItem an item from the followItems collection
  appendItemSkeleton: (followItem) ->
    @$('.follows').append $( itemTemplate item: followItem.getItem() )

  # Display item content
  #
  # The function assumes the skeleton (container) of this item already exists.
  # @param {Object} followItem an item from a followItems collection
  showItemContent: (followItem) =>
    item = followItem.getItem() # Actual item model, e.g. an Artist
    item.fetchArtworks success: (artworks) =>
      $container = @$("##{item.get('id')}")
      $followButton = $container.find(".follow-button")
      console.log $followButton
      $artworks = $container.find('.artworks')
      view = new FillwidthView
        artworkCollection: @artworkCollection
        fetchOptions: { 'filter[]': 'for_sale' }
        collection: artworks
        empty: (-> @$el.parent().remove() )
        el: $artworks
      view.render()
      new FollowButton
        followItemCollection: @followItems
        model: item
        el: $followButton
      _.defer ->
        view.hideFirstRow()
        view.removeHiddenItems()

module.exports.init = ->
  dict = artists: FollowArtists, genes: FollowGenes
  followItemCollection = if dict[sd.TYPE]? then new dict[sd.TYPE]() else []
  new FollowsView
    model: followItemCollection
    el: $('body')
    itemsPerPage: 10
