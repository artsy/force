_         = require 'underscore'
Backbone  = require 'backbone'
template  = -> require('./template.jade') arguments...

module.exports = class LocationSearchView extends Backbone.View
  announce: (location) ->
    @trigger 'location:update', location

  attach: ->
    google.maps.event.addListener @autocomplete, 'place_changed', =>
      @announce @autocomplete.getPlace()

  render: ->
    @$el.html template()
    @postRender()
    this

  postRender: ->
    @autocomplete = new google.maps.places.Autocomplete @$('input')[0], { types: ['(cities)'] }
    @attach()

  teardown: ->
    @autocomplete = null
    $('.pac-container').remove()

  remove: ->
    @teardown()
    super
