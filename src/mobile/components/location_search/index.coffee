_ = require 'underscore'
Backbone = require 'backbone'
template = -> require('./template.jade') arguments...

module.exports.LocationSearchView = class LocationSearchView extends Backbone.View
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

    #Disable FastClick on pac- divs to avoid race condition
    $('body').on 'DOMNodeInserted', ->
      $('.pac-item, .pac-item span').addClass('needsclick')

  remove: ->
    @autocomplete = null
    $('.pac-container').remove()
    super
