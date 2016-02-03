Backbone = require 'backbone'
PartnerCell = require '../partner_cell/view.coffee'
facetDefaults = require '../filters/facet_defaults.coffee'

module.exports = class ResultsView extends Backbone.View

  initialize: ({ @params, @following, @filterPartners }) ->
    @listenTo @filterPartners, 'reset', @fetch
    @listenTo @params, 'firstLoad', @fetch
    _.each _.pluck(facetDefaults, 'facetName'), (f) =>
      @listenTo @params, "change:#{f}", @reset
    @listenTo @filterPartners, 'add', @render
    @$gridContainer = @$('.galleries-institutions-results-grid')

    $.onInfiniteScroll =>
      if @params.hasSelection() and not @filterPartners.allFetched
        @fetch()
    , offset: 800

  render: (partners) ->
    @$el.attr 'data-state', 'finished-paging' if @filterPartners.allFetched
    cellViews = _.map partners, (partner) =>
      view = new PartnerCell
        following: @following
        partner: partner
        preferredCitySlug: @params.get('location')

      view.render()

    @$gridContainer.append _.pluck cellViews, '$el'

  fetch: ->
    @filterPartners.fetch @params.toJSON()

  reset: ->
    if @params.hasSelection()
      @$el.attr 'data-state', ''

    @$gridContainer.html ''

  remove: ->
    $.destroyInfiteScroll()
    super()


