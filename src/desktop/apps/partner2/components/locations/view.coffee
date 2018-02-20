_ = require 'underscore'
Q = require 'bluebird-q'
Backbone = require 'backbone'
template = -> require('./index.jade') arguments...
{ API_URL } = require('sharify').data

module.exports = class LocationsView extends Backbone.View

  initialize: (options = {}) ->
    { @partner } = options

  startUp: ->
    @fetch().then(@render).done()

  fetch: ->
    locations = @partner.related().locations
    Q(locations.fetch()).then -> locations

  render: (locations) =>
    return @remove() if locations.length is 0

    sortedLocations = locations.sortBy 'city'
    @$el.html template locations: sortedLocations

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super
