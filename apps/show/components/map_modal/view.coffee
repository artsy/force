_ = require 'underscore'
Backbone = require 'backbone'
MapModal = require './map.coffee'
template = -> require('./template.jade') arguments...

module.exports = class MapModalView extends Backbone.View

  tagName: 'a'

  className: 'map-modal-link'

  events: 
    'click': 'openMapModal'

  initialize: ( options ) ->
    @show = options.model
    @render()

  postrender: ->

  render: -> 
    @$el.html template
    this

  openMapModal: (e) ->
    e.preventDefault()
    @mapModal = new MapModal
      show: @show
      partner: @show.related().partner

  remove: ->
    @mapModal.remove()
    super
