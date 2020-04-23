_ = require 'underscore'
sd = require('sharify').data
qs = require 'querystring'
scrollFrame = require 'scroll-frame'
Backbone = require 'backbone'
Partner = require '../../../models/partner.coffee'
{ setupFilter } = require '../../../components/filter2/index.coffee'
{ ContextModule } = require "@artsy/cohesion"

template = -> require('../templates/artworks_filter.jade') arguments...

module.exports = class PartnerArtworksView extends Backbone.View

  initialize: (options={}) ->
    {
      @profile,
      @partner,
      @aggregations,
      @forSale,
      @hideForSaleButton,
      @counts,
      @filterRoot
    } = options

    queryParams = qs.parse(location.search.replace(/^\?/, ''))
    params = new Backbone.Model _.extend queryParams,
      page: 1
      size: 10
      aggregations: @aggregations
      partner_id: @partner.id

    @$el.html template
      hideForSaleButton: @hideForSaleButton
      partner: @partner
      filterRoot: @filterRoot
      counts: @counts
      params: params
      activeText: ''

    scrollFrame '#partner-filter a' unless sd.EIGEN

    { params } = setupFilter
      el: $ '#partner-filter'
      stuckParam: { 'partner_id': @partner.id }
      facets: @aggregations
      aggregations: @aggregations
      startHistory: false
      forSale: @forSale
      filterRoot: @filterRoot
      context_module: ContextModule.artworkGrid