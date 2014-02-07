Backbone = require 'backbone'
template = -> require('./template.jade') arguments...
mediator = require '../mediator.coffee'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: (opts) ->
    { @filterOptions } = opts
    @render()
    @

  render: ->
    @$el.html template mediums: @filterOptions?.medium

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click .filter-artworks-nav-allworks a': 'filterPrice'

  allWorks: ->
    mediator.trigger 'filter:allworks'

  filterPrice: (e) ->
    mediator.trigger 'filter:price', $(e.target).data 'range'

  filterMedium: (e) ->
    mediator.trigger 'filter:medium', $(e.target).data 'medium'