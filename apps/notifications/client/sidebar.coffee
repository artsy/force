_ = require 'underscore'
Backbone = require 'backbone'
SearchBarView = require '../../../components/search_bar/view.coffee'
Following = require '../../../components/follow_button/collection.coffee'
filterArtistTemplate = -> require('../templates/filter_artist.jade') arguments...

module.exports = class SidebarView extends Backbone.View

  events:
    'click #for-sale': 'toggleForSale'
    'click .filter-artist-name' : 'toggleArtist'
    'click .filter-artist-clear' : 'clearArtistWorks'

  initialize: ({@filterState}) ->
    @following = new Following [], kind: 'artist'
    @setupSearch()

  toggleForSale: (e) ->
    @filterState.set
      forSale: $(e.currentTarget).prop('checked')
      loading: true

  toggleArtist: (e) ->
    if @$selectedArtist then @$selectedArtist.attr 'data-state', null
    @$selectedArtist = @$(e.currentTarget).parent()
    @$selectedArtist.attr 'data-state', 'selected'
    @filterState.set
      artist: @$selectedArtist.attr('data-artist')
      loading: true

  clearArtistWorks: (e) ->
    @$selectedArtist.attr 'data-state', null
    @$selectedArtist = ''
    @filterState.set
      artist: null
      loading: true

  setupSearch: (options = {}) ->
    @searchBarView = new SearchBarView
      mode: 'artists'
      el: @$('#notifications-search-container')
      $input: @$searchInput ?= @$('#notifications-search')
      autoselect: true
      displayKind: false

    @listenTo @searchBarView, 'search:selected', @follow

  follow: (e, model) ->
    @searchBarView?.clear()
    @following.follow model.get('id')
    @$('.notifications-artist-list').prepend filterArtistTemplate
      artist:
        id: model.get('id')
        name: model.get('name')
        published_artworks_count: model.get('published_artworks_count')
    @$(".filter-artist[data-artist=#{model.get('id')}]").children('.filter-artist-name').click()