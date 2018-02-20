_ = require 'underscore'
Backbone = require 'backbone'
_s = require 'underscore.string'

module.exports = class HeadlineView extends Backbone.View

  initialize: ({ @collection, @params, @facets, @stuckFacet, @stuckParam }) ->
    @listenTo @collection, "initial:fetch", @setHeadline, @

    @stuckFacet = null if @stuckParam is 'fair_id'

    for facet in @facets
      @listenTo @params, "change:#{facet}", @setHeadline, @

    @counts = _.clone @collection.counts

  setHeadline: ->
    if @anyFacetsSelected() || @stuckFacet
      @$el.text(@paramsToHeading()).show()
    else
      @$el.text("").hide()

  facetName: (facet)->
    @counts?[facet]?[@params.get(facet)]?.name

  anyFacetsSelected: ->
    _.any @facets, (facet) => @params.has facet

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

  paramsToHeading: ->
    if @anyFacetsSelected() || @stuckFacet
      _.compact([
        @facetName('dimension_range'),
        (@displayMedium()),
        @facetName('price_range')
      ]).join(' ')
