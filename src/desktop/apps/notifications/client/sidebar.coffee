_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
TypeaheadView = require '../../../components/typeahead/view.coffee'
filterArtistTemplate = -> require('../templates/filter_artist.jade') arguments...
grid = require('./react_grid.js').default

module.exports = class SidebarView extends Backbone.View

  events:
    'click #for-sale': 'toggleForSale'
    'click .filter-artist-name' : 'toggleArtist'
    'click .filter-artist-clear' : 'clearArtistWorks'

  initialize: ({@filterState, @following}) ->
    if @filterState.get 'artist'
      @$selectedArtist = @$(".filter-artist[data-artist=#{@filterState.get('artist')}]")
      @$selectedArtist.attr 'data-state', 'selected'

    if @filterState.get 'forSale'
      @$('#for-sale').attr('checked', true)

    @setupSearch()

  toggleForSale: (e) ->
    window.analytics.track('Toggled "For Sale" on "Works For You" page')
    forSale = $(e.currentTarget).prop('checked')
    artist = @$selectedArtist.attr 'data-artist' if @$selectedArtist
    grid.setupReactGrid({forSale: forSale, artistID: artist})
    @filterState.set
      forSale: forSale
      loading: true
      empty: false
      initialLoad: false

  toggleArtist: (e) ->
    if @$selectedArtist then @$selectedArtist.attr 'data-state', null
    @$selectedArtist = @$(e.currentTarget).parent()
    @$selectedArtist.attr 'data-state', 'selected'
    artist = @$selectedArtist.attr 'data-artist' if @$selectedArtist
    grid.setupReactGrid({forSale: @filterState.get('forSale'), artistID: artist})
    @filterState.set
      artist: artist
      loading: true
      empty: false
      initialLoad: false

  clearArtistWorks: (e) ->
    @$selectedArtist.attr 'data-state', null
    @$selectedArtist = ''
    grid.setupReactGrid({artistID: "", forSale: @filterState.get('forSale')})
    @filterState.set
      artist: null
      loading: true
      empty: false
      initialLoad: false

  setupSearch: (options = {}) ->
    @typeahead = new TypeaheadView
      kind: 'artists'
      autoselect: true

    @$('#notifications-search-container').html @typeahead.render().$el

    @listenTo @typeahead, 'selected', @follow

  follow: (model) ->
    @following.follow model.get('id')
    @$('.notifications-artist-list').prepend filterArtistTemplate
      artist:
        id: model.get('id')
        name: model.get('name')
        published_artworks_count: model.get('published_artworks_count')
        forsale_artworks_count: model.get('forsale_artworks_count')
    @$(".filter-artist[data-artist=#{model.get('id')}]").children('.filter-artist-name').click()
