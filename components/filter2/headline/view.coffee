_ = require 'underscore'
Backbone = require 'backbone'
_s = require 'underscore.string'

module.exports = class HeadlineView extends Backbone.View

  initialize: ({@collection, @params, @facets}) ->
    @listenTo @collection, "initial:fetch", @setHeadline, @

    for facet in @facets
      @listenTo @params, "change:#{facet}", @setHeadline, @

  setHeadline: ->
    if headingText = @paramsToHeading()
      @$el.text(headingText).show()

      document.title = _.compact([
        _s.capitalize(headingText)
        "Artsy"
      ]).join(' | ')

    else
      @$el.hide()

  facetName: (facet)->
    @collection.counts?[facet]?[@params.get(facet)]?.name

  anyFacetsSelected: ->
    _.any @facets, (facet) => @params.has facet

  paramsToHeading: ->
    if @anyFacetsSelected()
      _.compact([
        @facetName('dimension_range'),
        (@facetName('medium') || 'artworks'),
        @facetName('price_range')
      ]).join(' ')