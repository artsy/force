_ = require 'underscore'
Backbone = require 'backbone'
DropdownView = require '../dropdown/view'

module.exports = class DropdownGroupView extends Backbone.View
  subViews: {}

  events:
    'click .filter-nav-only-for-sale' : 'toggleForSale'

  # for every facet, render a dropdown view and set up count events
  initialize: ({@collection, @params, @facets}) ->
    for facet in @facets
      @initSubView facet

    @listenTo @params, 'change:for_sale', @checkForSale
    @checkForSale()

  # init subview and add to subview hash
  initSubView: (facet) ->
    @subViews[facet] = new DropdownView
      facet: facet
      facets: @facets
      collection: @collection
      params: @params
      el: @$("#filter-dropdown-#{facet}")

  checkForSale: ->
    if @params.get('for_sale') is 'true'
      @$('#only-for-sale').prop 'checked', true
      @$('.filter-nav-only-for-sale').addClass('is-active')
    else
      @$('#only-for-sale').prop 'checked', false
      @$('.filter-nav-only-for-sale').removeClass('is-active')

  toggleForSale: ->
    if @params.get('for_sale') is 'true'
      @params.set 'for_sale', null
    else
      @params.set 'for_sale', 'true'

    false
