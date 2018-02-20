Backbone = require 'backbone'
metaphysics = require '../../../../../lib/metaphysics.coffee'
mediator = require '../../../../lib/mediator.coffee'
tabQuery = require './query.coffee'
artistSuggestionQuery = require './artist_suggestion_query.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

cellsTemplate = -> require('./templates/_cells.jade') arguments...
resultsTemplate = -> require('./templates/results.jade') arguments...

module.exports = class ArtistsToFollowView extends Backbone.View

  events:
    'click .artists-to-follow-tab' : 'updateState'

  updateState: (e) ->
    @state.set type: $(e.currentTarget).data 'type'

  initialize: ({ @user, @state, @results })->
    @listenTo @state, 'change', @selectTab
    @listenTo @state, 'change', @updateResults
    @listenTo mediator, 'follow-button:follow', @afterFollow

  selectTab: (type) ->
    @$(".artists-to-follow-tab.is-active").removeClass('is-active')
    @$(".artists-to-follow-tab[data-type=#{@state.get('type')}]").addClass('is-active')

  updateResults: ->
    metaphysics
      query: tabQuery
      variables: type: @state.get('type')
      req: { user: @user }
    .then ({ home_page: { artist_module: { results } } }) =>
      @results = results
      @renderResults()

  renderResults: ->
    @$('.artists-to-follow__inner__results').html resultsTemplate
      results: @results

    @_postRender()

  _postRender: ->
    _.defer =>
      @carousel = initCarousel @$('.mgr-horizontal-nav'), groupCells: true
      @_setupFollowButtons()

  _setupFollowButtons: ($el = null) ->
    view = @
    $el ?= @$el
    @following = new Following(null, kind: 'artist') if @user and not @following?

    ids = $el.find('.follow-button').map ->
      view._addFollowButton $(this).data('id'), $(this)

    @following?.syncFollows ids

  _addFollowButton: (id, $el) ->
    new FollowButton
      context_page: "Home page"
      context_module: "Artists to Follow rail"
      following: @following
      model: new Backbone.Model id: id
      modelName: 'artist'
      hideSuggestions: true
      el: $el
      href: _.findWhere(@results, id: id)?.href
    id

  afterFollow: (el, model) =>
    metaphysics
      query: artistSuggestionQuery
      variables: artist_id: model.id
      req: { user: @user }
    .then ({ me: { suggested_artists } }) =>
      $cell = $(el).closest('.mgr-cell')
      $cell.fadeOut 'slow', =>
        @carousel.cells.flickity.remove $(el).closest('.mgr-cell')
        artists = _.reject suggested_artists, (artist) =>
          _.contains(@results, artist)
        html = $(cellsTemplate results: artists)
        @_setupFollowButtons html
        appended = @carousel.cells.flickity.append html

