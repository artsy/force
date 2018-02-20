_ = require 'underscore'
Backbone = require 'backbone'
_s = require 'underscore.string'

module.exports = class HeadlineView extends Backbone.View

  initialize: ({ @collection, @params, @facets, @defaultHeading}) ->
    @listenTo @collection, "initial:fetch", @setHeadline, @

    for facet in @facets
      @listenTo @params, "change:#{facet}", @setHeadline, @
      @listenTo @params, "change:#{facet}", @setTitle, @

    @listenTo @params, "change:for_sale", @setTitle, @
    @listenTo @params, "change:for_sale", @setHeadline, @

  setHeadline: ->
    if @anyFacetsSelected() || @defaultHeading
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

  humanizeMedium: ->
    # replace the 'slash' in 'film-slash-video'
    _s.humanize(@params.get('medium')).replace('slash', '/')

  displayMedium: ->
    return @humanizeMedium() || @defaultHeading || 'Artworks'

  displayForSale: ->
    "For Sale" if @params.get('for_sale') is 'true'

  paramsToHeading: ->
    if @anyFacetsSelected() || @defaultHeading
      _.compact([
        @facetName('dimension_range'),
        (@displayMedium()),
        @facetName('price_range'),
        @displayForSale()
      ]).join(' ')
