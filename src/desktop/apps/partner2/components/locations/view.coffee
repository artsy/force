_ = require 'underscore'
Backbone = require 'backbone'
require '../../../../../lib/promiseDone'
template = -> require('./index.jade') arguments...
{ API_URL } = require('sharify').data

module.exports = class LocationsView extends Backbone.View

  initialize: (options = {}) ->
    { @partner } = options

  startUp: ->
    @fetch().then(@render).done()

  fetch: ->
    locations = @partner.related().locations
    Promise.resolve(locations.fetch()).then -> locations

  render: (locations) =>
    return @remove() if locations.length is 0

    sortedLocations = locations.sortBy 'city'
    @$el.html template locations: sortedLocations

  remove: ->
    @$el.closest('.partner2-overview-section').remove()
    super
