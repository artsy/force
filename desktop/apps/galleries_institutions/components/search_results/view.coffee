_ = require 'underscore'
Backbone = require 'backbone'
PartnerCellView = require '../partner_cell/view.coffee'

module.exports = class ResultsView extends Backbone.View

  initialize: ({ @params, @following, @filterPartners }) ->
    @listenTo @filterPartners, 'reset', @reset
    @listenTo @params, 'firstLoad', @fetch
    @listenTo @filterPartners, 'partnersAdded', @render
    @$gridContainer = @$('.galleries-institutions-results-grid')
    $.onInfiniteScroll =>
      @fetchNextPage()
    , offset: 800

  render: (partners) ->

    state = if @filterPartners.allFetched then 'finished-paging' else ''
    @$el.attr 'data-state', state
    cellViews = _.map partners, (partner) =>
      view = new PartnerCellView
        following: @following
        partner: partner
        preferredCitySlug: @params.get('location')

      view.render()

    @$gridContainer.append _.pluck cellViews, '$el'

  fetch: ->
    @filterPartners.fetch()

  fetchNextPage: ->
    if @params.hasSelection() and not @filterPartners.allFetched
      @fetch()

  reset: ->
    @$gridContainer.html ''
    @fetch()

  remove: ->
    $.destroyInfiteScroll()
    super()


