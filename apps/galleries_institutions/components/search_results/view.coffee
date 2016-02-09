Backbone = require 'backbone'
PartnerCell = require '../partner_cell/view.coffee'
facetDefaults = require '../filter_facet/facet_defaults.coffee'

module.exports = class ResultsView extends Backbone.View

  initialize: ({ @params, @following, @filterPartners }) ->
    @listenTo @filterPartners, 'reset', @reset
    @listenTo @params, 'firstLoad', @fetch
    @listenTo @filterPartners, 'partnersAdded', @render
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
    @filterPartners.fetch()

  reset: ->
    @$gridContainer.html ''
    @fetch()

  remove: ->
    $.destroyInfiteScroll()
    super()


