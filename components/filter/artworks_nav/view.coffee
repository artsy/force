Backbone = require 'backbone'
template = require './template.jade'
mediator = require '../mediator.coffee'

module.exports = class FilterArtworksNav extends Backbone.View

  initialize: ->
    @render()
    @

  render: ->
    @$el.html template()

  events:
    'click .filter-artworks-nav-allworks': 'allWorks'
    'click .filter-artworks-nav-allworks a': 'filterPrice'

  allWorks: ->
    mediator.trigger 'filter:allworks'

  filterPrice: (e) ->
    mediator.trigger 'filter:price', $(e.target).data 'range'