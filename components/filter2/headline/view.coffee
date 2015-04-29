_ = require 'underscore'
Backbone = require 'backbone'
_s = require 'underscore.string'

module.exports = class HeadlineView extends Backbone.View

  initialize: ({@collection, @params, @facets, @stuckFacet}) ->
    @listenTo @collection, "initial:fetch", @setHeadline, @

    for facet in @facets
      @listenTo @params, "change:#{facet}", @setHeadline, @
      @listenTo @params, "change:#{facet}", @setTitle, @

  setHeadline: ->
    if @anyFacetsSelected()
      @$el.text(@paramsToHeading()).show()
    else
      @$el.text("").hide()

  setTitle: ->
    document.title = _.compact([
      _s.capitalize @paramsToHeading()
      "Artsy"
    ]).join(' | ')

  facetName: (facet)->
    @collection.counts?[facet]?[@params.get(facet)]?.name

  anyFacetsSelected: ->
    _.any @facets, (facet) => @params.has facet

  displayMedium: ->
    if @stuckFacet
      @stuckFacet.get('name')
    else
      @facetName('medium') || 'Artworks'

  paramsToHeading: ->
    if @anyFacetsSelected() || @stuckFacet
      _.compact([
        @facetName('dimension_range'),
        (@displayMedium()),
        @facetName('price_range')
      ]).join(' ')