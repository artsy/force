_                       = require 'underscore'
Backbone                = require 'backbone'
Artist                  = require '../../../models/artist.coffee'
Artists                 = require '../../../collections/artists.coffee'
Gene                    = require '../../../models/gene.coffee'
Genes                   = require '../../../collections/genes.coffee'
sd                      = require('sharify').data
FillwidthView           = require '../../../components/fillwidth_row/view.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FollowArtistCollection  = require '../../../models/follow_artist_collection.coffee'
FollowButton            = require './follow_button.coffee'
itemTemplate            = -> require('../templates/following_artist.jade') arguments...

module.exports.FollowingView = class FollowingView extends Backbone.View

  initialize: (options) ->
    @pageNum = 1
    @itemsPerPage = sd.ITEMS_PER_PAGE or 5
    @setupCurrentUser()
    @setupFollowingItems()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()
    @followArtistCollection = new FollowArtistCollection

  setupFollowingItems: ->
    @followingItems = @_bootstrapItems sd.TYPE, sd.FOLLOWING_ITEMS
    if @followingItems.length > @itemsPerPage
      $(window).bind 'scroll.following', _.throttle(@_infiniteScroll, 150)
    @_loadNextPage()

  _showItem: (item) =>
    item.fetchArtworks success: (artworks) =>
      $parent = @$('.following')
      $container = @$("##{sd.TYPE} ##{item.id}")
      if $container.length is 0
        $container = $( itemTemplate item: item.toJSON() )
        $parent.append $container
      $followButton = $container.find(".follow-button")
      $artworks = $container.find('.artworks')
      new FillwidthView(
        artworkCollection: @artworkCollection
        fetchOptions: { 'filter[]': 'for_sale' }
        collection: artworks
        seeMore: true
        empty: (-> @$el.parent().remove() )
        el: $artworks
      ).nextPage(false, 10)

      ###
      # TODO Refactor FollowButton to allow following different types
      new FollowButton
        followArtistCollection: @followArtistCollection
        model: item
        el: $followButton
      ###

  _loadNextPage: ->
    end = @itemsPerPage * @pageNum
    start = end - @itemsPerPage
    return unless @followingItems.length > start

    showingItems = @followingItems.slice start, end
    _.each showingItems, @_showItem
    ++@pageNum

  _infiniteScroll: =>
    $(window).unbind('.following') unless @pageNum * @itemsPerPage < @followingItems.length
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.following > .item:last')
    @_loadNextPage() unless fold < $lastItem.offset()?.top + $lastItem.height()

  _bootstrapItems: (type, items) ->
    #TODO Use a more intelligent method
    dict =
      artists: collection: Artists, model: Artist
      genes: collection: Genes, model: Gene

    collection = if dict[type]? then new dict[type].collection(
      _.map items, (i) -> new dict[type].model i
    ) else []


module.exports.init = ->
  new FollowingView
    el   : $('body')
