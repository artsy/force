Backbone = require 'backbone'
metaphysics = require '../../../../lib/metaphysics.coffee'
mediator = require '../../../../lib/mediator.coffee'
query = require './query.coffee'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'

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
      query: query
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

  _setupFollowButtons: ->
    view = @
    following = new Following(null, kind: 'artist') if @user
    ids = @$('.follow-button').map ->
      id = ($el = $(this)).data 'id'

      new FollowButton
        context_page: "Home page"
        context_module: "Artists to Follow rail"
        following: following
        model: new Backbone.Model id: id
        modelName: 'artist'
        hideSuggestions: true
        el: $el
        href: _.findWhere(view.results, id: id)?.href
      id

    following?.syncFollows ids

  afterFollow: (el, model) =>
    $cell = $(el).closest('.mgr-cell')
    $cell.fadeOut 'slow', =>
      @carousel.cells.flickity.remove $(el).closest('.mgr-cell')
