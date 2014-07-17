_ = require 'underscore'
Backbone = require 'backbone'
geo = require '../geo/index.coffee'
{ isTouchDevice } = require '../util/device.coffee'

template = -> require('./template.jade') arguments...

module.exports = class LocationSearchView extends Backbone.View
  initialize: (options = {}) ->
    { @autofocus } = options

  announce: (location) ->
    @trigger 'location:update', location

  attach: ->
    google.maps.event.addListener @autocomplete, 'place_changed', =>
      @announce @autocomplete.getPlace()
    # Prevent form submission on enter (maybe should be an option)
    # Can't use normal event handlers where the Google is concerned
    google.maps.event.addDomListener @input, 'keydown', (e) ->
      e.preventDefault() if e.keyCode is 13

  determineAutofocus: ->
    return undefined if @autofocus is false
    if isTouchDevice() then undefined else true

  render: (value = null) ->
    @$el.html template(autofocus: @determineAutofocus(), value: value)
    @postRender()
    this

  postRender: ->
    @input = @$('input')[0]
    geo.loadGoogleMaps =>
      @autocomplete = new google.maps.places.Autocomplete @input, types: ['(cities)']
      @attach()

  teardown: ->
    @autocomplete = null
    $('.pac-container').remove()

  remove: ->
    @teardown()
    super
