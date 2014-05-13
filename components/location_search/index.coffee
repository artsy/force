_                   = require 'underscore'
Backbone            = require 'backbone'
geo                 = require '../util/geolocate.coffee'
{ isTouchDevice }   = require '../util/device.coffee'
template            = -> require('./template.jade') arguments...

module.exports = class LocationSearchView extends Backbone.View
  announce: (location) ->
    @trigger 'location:update', location

  attach: ->
    google.maps.event.addListener @autocomplete, 'place_changed', =>
      @announce @autocomplete.getPlace()

  render: (value = null) ->
    @$el.html template(isTouchDevice: isTouchDevice(), value: value )
    @postRender()
    this

  postRender: ->
    geo.loadGoogleMaps =>
      @autocomplete = new google.maps.places.Autocomplete @$('input')[0], { types: ['(cities)'] }
      @attach()

  teardown: ->
    @autocomplete = null
    $('.pac-container').remove()

  remove: ->
    @teardown()
    super
