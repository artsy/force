_ = require 'underscore'
Backbone = require 'backbone'
_s = require 'underscore.string'

module.exports = class HeadlineView extends Backbone.View

  initialize: ({@collection, @params, @facets, @stuckFacet, @stuckParam}) ->
    @listenTo @collection, "initial:fetch", @setHeadline, @

    for facet in @facets
      @listenTo @params, "change:#{facet}", @setHeadline, @
      @listenTo @params, "change:#{facet}", @setTitle, @

    @listenTo @params, "change:for_sale", @setTitle, @
    @listenTo @params, "change:for_sale", @setHeadline, @

    @stuckFacet = null if @stuckParam is 'fair_id'

  setHeadline: ->
    if @anyFacetsSelected() || @stuckFacet
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
    @params.get('for_sale') is 'true' || _.any @facets, (facet) => @params.has facet

  humanizeMedium: ->
    # replace the 'slash' in 'film-slash-video'
    _s.humanize(@params.get('medium')).replace('slash', '/')

  displayMedium: ->
    if @stuckFacet
      if @params.has('medium')
        @humanizeMedium()
      else
        @stuckFacet.get('name')
    else
      @humanizeMedium() || 'Artworks'

  displayForSale: ->
    "For Sale" if @params.get('for_sale') is 'true'

  paramsToHeading: ->
    if @anyFacetsSelected() || @stuckFacet
      _.compact([
        @facetName('dimension_range'),
        (@displayMedium()),
        @facetName('price_range'),
        @displayForSale()
      ]).join(' ')