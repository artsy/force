_               = require 'underscore'
Backbone        = require 'backbone'
{ ARTSY_URL }   = require('sharify').data
{ Markdown }    = require 'artsy-backbone-mixins'

Artworks            = require '../../../collections/artworks.coffee'
ArtworkColumnsView  = require '../../../components/artwork_columns/view.coffee'

template = -> require('../templates/layered-search.jade') arguments...

module.exports.Layer = class Layer extends Backbone.Model
  _.extend @prototype, Markdown

  initialize: (options = {}) ->
    @artworkId = @collection.artworkId
    @artworks = new Artworks
    @artworks.url = "#{ARTSY_URL}/api/v1/related/layer/#{@get('type')}/#{@id}/artworks?artwork[]=#{@artworkId}"

module.exports.Layers = class Layers extends Backbone.Collection
  url: "#{ARTSY_URL}/api/v1/related/layers"
  model: Layer

  initialize: (options) ->
    { @artworkId } = options

  fetch: (options = {}) ->
    _.extend options, data: 'artwork[]': @artworkId
    Backbone.Collection::fetch.call this, options

module.exports.LayeredSearchView = class LayeredSearchView extends Backbone.View
  template: template

  events:
    'click .layered-search-layer-button' : 'selectLayer'

  initialize: (options = {}) ->
    { @artwork } = options
    @setupLayers()

  setupLayers: ->
    @layers = new Layers artworkId: @artwork.id
    @layers.fetch
      success:  => @render()
      errro:    => @remove()

  selectLayer: (e) ->
    id = ($target = $(e.currentTarget)).data 'id'
    @__activeLayer__ = @layers.get id
    @activateLayerButton $target
    @$layeredSearchResults.html '<div class="loading-spinner"></div>'
    @fetchAndRenderActiveLayer()

  fetchAndRenderActiveLayer: ->
    if @activeLayer().artworks.length
      # Already fetched
      @renderLayer()
    else
      @activeLayer().artworks.
        fetch success: => @renderLayer()

  activeLayer: ->
    @__activeLayer__ or @layers.first()

  activateLayerButton: ($target) ->
    @$layerButtons.attr 'data-state', 'inactive'
    $target.attr 'data-state', 'active'

  renderLayer: (collection) ->
    # Ideally we should be removing this view before re-rendering
    # which would require a small refactor to the ArtworkColumns component
    @artworkColumnsView = new ArtworkColumnsView
      el: @$layeredSearchResults
      collection: @activeLayer().artworks
      numberOfColumns: 4
      gutterWidth: 40
      maxArtworkHeight: 400
      isOrdered: false
      seeMore: false

  postRender: ->
    @$layeredSearchResults = @$('#layered-search-results')
    # Activate the first tab
    (@$layerButtons ?= @$('.layered-search-layer-button')).
      first().click()

  render: ->
    # If only one layer is returned it will be "For sale"
    # which, on its own, doesn't appear to have useful recommendations
    return @remove() unless @layers.length > 1

    @$el.html template(layers: @layers)
    @postRender()
    this
