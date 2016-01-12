Backbone = require 'backbone'
FilterPartners = require '../../../../collections/filter_partners.coffee'
PartnerCell = require '../partner_cell/view.coffee'

module.exports = class ResultsView extends Backbone.View

  initialize: ({ params, @following }) ->
    @partners = new FilterPartners
    @listenTo params, 'change:page firstLoad', @fetch
    @listenTo params, 'change:category change:location', @reset
    @listenTo @partners, 'sync', @render
    @$gridContainer = @$('.galleries-institutions-results-grid')

    $.onInfiniteScroll =>
      if params.hasSelection() and not @allFetched
        params.set page: (params.get('page') + 1) or 1

  render: (collection, response) ->
    @allFetched = response.length is 0

    @$el.attr 'data-state', 'finished-paging' if @allFetched

    cellViews = @partners.map (partner) ->

      view = new PartnerCell
        following: @following
        partner: partner

      partner.related().profile.fetch()
      partner.related().locations.fetch()

      view.render()

    @$gridContainer.append _.pluck cellViews, '$el'
    @$el.show()

  fetch: (params) ->
    @partners.fetch data: params.toJSON()

  reset: (params) ->
    params.set { page: 1 }, silent: true

    @allFetched = false

    if params.hasSelection()
      @$el.attr 'data-state', ''
      params.trigger 'change change:page', params
    else
      @$el.hide()

    @$gridContainer.html ''
    @partners.reset()


