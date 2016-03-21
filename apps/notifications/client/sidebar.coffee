_ = require 'underscore'
Backbone = require 'backbone'
qs = require 'querystring'
TypeaheadView = require '../../../components/typeahead/view.coffee'
filterArtistTemplate = -> require('../templates/filter_artist.jade') arguments...

module.exports = class SidebarView extends Backbone.View

  events:
    'click #for-sale': 'toggleForSale'
    'click .filter-artist-name' : 'toggleArtist'
    'click .filter-artist-clear' : 'clearArtistWorks'

  initialize: ({@filterState, @following}) ->
    @history = window.history
    if @filterState.get 'artist'
      @$selectedArtist = @$(".filter-artist[data-artist=#{@filterState.get('artist')}]")
      @$selectedArtist.attr 'data-state', 'selected'

    if @filterState.get 'forSale'
      @$('#for-sale').attr('checked', true)

    @setupSearch()

  paramsForUrl: ->
    params = _.pick @filterState.attributes, [ 'artist', 'forSale' ]
    _.omit params, (val, key) ->
      not val?

  toggleForSale: (e) ->
    forSale = $(e.currentTarget).prop('checked')
    @filterState.set
      forSale: forSale
      loading: true
      empty: false
      initialLoad: false
    if forSale
      @history.pushState({}, 'For Sale', '/works-for-you?' + qs.stringify(@paramsForUrl()))
    else
      @history.pushState({}, 'Not For Sale', '/works-for-you?' + qs.stringify(@paramsForUrl()))

  toggleArtist: (e) ->
    if @$selectedArtist then @$selectedArtist.attr 'data-state', null
    @$selectedArtist = @$(e.currentTarget).parent()
    @$selectedArtist.attr 'data-state', 'selected'
    @filterState.set
      artist: @$selectedArtist.attr('data-artist')
      loading: true
      empty: false
      initialLoad: false
    @history.pushState({}, "Artist", '/works-for-you?' + qs.stringify(@paramsForUrl()))

  clearArtistWorks: (e) ->
    @$selectedArtist.attr 'data-state', null
    @$selectedArtist = ''
    @history.pushState({}, "Clear", "/works-for-you")
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
    @$(".filter-artist[data-artist=#{model.get('id')}]").children('.filter-artist-name').click()
