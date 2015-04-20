_ = require 'underscore'
Backbone = require 'backbone'
DropdownView = require '../dropdown/view.coffee'

module.exports = class DropdownGroupView extends Backbone.View
  subViews: {}

  # for every facet, render a dropdown view and set up count events
  initialize: ({@collection, @params, @facets}) ->
    for facet in @facets
      @initSubView facet

  # init subview and add to subview hash
  initSubView: (facet) ->
    @subViews[facet] = new DropdownView
      facet: facet
      facets: @facets
      collection: @collection
      params: @params
      el: @$("#filter-dropdown-#{facet}")