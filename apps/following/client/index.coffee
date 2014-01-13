_                       = require 'underscore'
Backbone                = require 'backbone'
Artworks                = require '../../../collections/artworks.coffee'
Artist                  = require '../../../models/artist.coffee'
Artists                 = require '../../../collections/artists.coffee'
Gene                    = require '../../../models/gene.coffee'
Genes                   = require '../../../collections/genes.coffee'
sd                      = require('sharify').data
FillwidthView           = require '../../../components/fillwidth_row/view.coffee'
CurrentUser             = require '../../../models/current_user.coffee'
FollowArtistCollection  = require '../../../models/follow_artist_collection.coffee'
FollowButton            = require './follow_button.coffee'
ArtworkCollection = require '../../../models/artwork_collection.coffee'
itemTemplate = -> require('../templates/following_artist.jade') arguments...

module.exports.FollowingView = class FollowingView extends Backbone.View

  initialize: (options) ->
    @pageNum = 1
    @itemsPerPage = sd.ITEMS_PER_PAGE or 5
    @setupCurrentUser()
    @setupFollowingArtists()
    @setupFollowingGenes()

  setupCurrentUser: ->
    @currentUser = CurrentUser.orNull()
    @currentUser?.initializeDefaultArtworkCollection()
    @artworkCollection = @currentUser?.defaultArtworkCollection()
    @followArtistCollection = new FollowArtistCollection

  _showArtist: (artist) ->
    artist.fetchArtworks success: (artworks) =>
      $parent = @$('.following')
      $container = @$('#artists #' + artist.id)
      if $container.length is 0
        $container = $( itemTemplate item: artist.toJSON() )
        $parent.append $container
      $followButton = $container.find('.artist-follow-button')
      $artworks = $container.find('.artworks')
      new FillwidthView(
        artworkCollection: @artworkCollection
        fetchOptions: { 'filter[]': 'for_sale' }
        collection: artworks
        seeMore: true
        empty: (-> @$el.parent().remove() )
        el: $artworks
      ).nextPage(false, 10)
      new FollowButton
        followArtistCollection: @followArtistCollection
        model: artist
        el: $followButton

  _loadNextPage: ->
    end = @itemsPerPage * @pageNum
    start = end - @itemsPerPage
    return unless @followingArtists.length > start
    console.log "Loading page #" + @pageNum + ", start: " + start + " end: " + end
    @showingArtists = @followingArtists.slice start, end
    _.each @showingArtists, @_showArtist
    ++@pageNum

  _infiniteScroll: =>
    console.log "Calling infiniteScroll()"
    $(window).unbind('.following') unless @pageNum * @itemsPerPage < @followingArtists.length
    fold = $(window).height() + $(window).scrollTop()
    $lastItem = @$('.following > .item:last')
    if fold >= $lastItem.offset()?.top + $lastItem.height()
      console.log "About to load the next page"
      @_loadNextPage()

  setupFollowingArtists: ->
    @followingArtists = new Artists _.map sd.FOLLOWING_ARTISTS, (a) -> new Artist(a)
    if @followingArtists.length > @itemsPerPage
      $(window).bind 'scroll.following', _.throttle(@_infiniteScroll, 150)
    console.log "Total items: " + @followingArtists.length
    @_loadNextPage()

  setupFollowingGenes: ->
    @followingGenes = new Genes _.map sd.FOLLOWING_GENES, (g) -> new Gene(g)
    @followingGenes.each (gene) =>
      gene.fetchArtworks
        success: (artworks) =>
          $container = @$('#genes #' + gene.id)
          $followButton = $container.find('.artist-follow-button')
          $artworks = $container.find('.artworks')
          new FillwidthView(
            artworkCollection: @artworkCollection
            fetchOptions: { 'filter[]': 'for_sale' }
            collection: artworks
            seeMore: true
            empty: (-> @$el.parent().remove() )
            el: $artworks
          ).nextPage(false, 10)
          # TODO Make FollowButton reusable for genes
          new FollowButton
            followArtistCollection: @followArtistCollection
            model: gene
            el: $followButton
        error: (data) =>

module.exports.init = ->
  new FollowingView
    el   : $('body')
