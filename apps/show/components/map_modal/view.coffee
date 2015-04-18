Q = require 'q'
_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
# Artwork = require '../../../../collections/artworks.coffee' 
MapModal = require './map.coffee'
template = -> require('./template.jade') arguments...

module.exports = class MapModalView extends Backbone.View

  tagName: 'a'

  className: 'map-modal-link'

  events: 
    'click': 'openShare'

  initialize: ( options ) ->
    @artworks = options.collection.models
    console.log @artworks
    # @show = options.model 
    @render()

  postrender: ->

  render: -> 
    @$el.html template
      # show: @show
    # @postrender() 
    this

  openShare: (e) ->
    console.log 'opening share'
    e.preventDefault()
    # analytics.snowplowStruct 'share', 'click', @artwork.get('_id'), 'artwork'
    new MapModal
      width: '500px'
      media: @artworks[0].defaultImageUrl('large')
      description: @artworks[0].toAltText()
