_ = require 'underscore'
Backbone = require 'backbone'
Genes = require '../../../collections/genes.coffee'
sd = require('sharify').data
FillwidthView = require '../../../components/fillwidth_row/view.coffee'
CurrentUser = require '../../../models/current_user.coffee'
itemTemplate = -> require('../templates/follows_item.jade') arguments...
hintTemplate = -> require('../templates/empty_hint.jade') arguments...
Artist = require '../../../models/artist.coffee'
Gene = require '../../../models/gene.coffee'
SuggestedGenesView = require '../../../components/suggested_genes/view.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'

kindToModel = artist: Artist, gene: Gene

module.exports.FollowsView = class FollowsView extends Backbone.View

  defaults:
    pageSize: 10
    nextPage: 1   # page number of the next page to load

  initialize: (options={}) ->
    { @pageSize, @nextPage } = _.defaults options, @defaults
    @followItems = if options.collection then options.collection else new Following(null, kind: sd.KIND)

    @setupCurrentUser()
    @loadNextPage()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()

  loadNextPage: ->
    @fetchNextPage
      success: (collection, response, options) =>
        @isFetching = false
        @$('.follows .loading-spinner').hide()

        page = options?.data?.page or @nextPage # fetched page

        if page is 1
          $(window).on 'scroll.following', _.throttle(@infiniteScroll, 150)
          @showEmptyHint() unless @followItems.length > 0

        end = page * @pageSize
        start = end - @pageSize

        if @followItems.length < end
          $(window).off '.following'

        if @followItems.length > start
          showingItems = @followItems.slice start, end
          _.each showingItems, (item) =>
            model = new kindToModel[item.kind] item.get(item.kind)
            @appendItemSkeleton(model)
            @showItemContent(model)
          @nextPage = page + 1

  fetchNextPage: (options) ->
    return unless not @isFetching
    @isFetching = true

    data =
      page: @nextPage
      size: @pageSize
    @followItems.fetch
      data: data
      remove: false
      merge: true
      success: options?.success
      error: options?.error

  infiniteScroll: =>
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.follows > .favorites2-follows-item:last')
    @loadNextPage() unless fold < $lastItem.offset()?.top + $lastItem.height()

  showEmptyHint: () ->
    @$('.favorites2-follows-empty-hint').html $( hintTemplate type: sd.KIND+'s' )
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
        seeMore: false
      view.render()
      new FollowButton
        following: @followItems
        modelName: 'artist'
        model: followItem
        el: $followButton
      _.defer ->
        view.hideSecondRow()
        view.removeHiddenItems()
