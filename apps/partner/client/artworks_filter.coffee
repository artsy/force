_ = require 'underscore'
sd = require('sharify').data
scrollFrame = require 'scroll-frame'
Backbone = require 'backbone'
Partner = require '../../../models/partner.coffee'
{ setupFilter } = require '../../../components/filter2/index.coffee'

template = -> require('../templates/artworks_filter.jade') arguments...

module.exports = class PartnerArtworksView extends Backbone.View

  initialize: (options={}) ->
    { @profile, @partner, @aggregations, @forSaleOnly, @hideForSaleButton, @counts, @filterRoot } = options
    params = new Backbone.Model partner_id: @partner.id
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
      stuckParam: { 'partner_id': partner.id }
      facets: @aggregations
      aggregations: @aggregations
      startHistory: false
      forSale: @forSaleOnly
      filterRoot: @filterRoot

