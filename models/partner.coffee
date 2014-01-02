sd        = require('sharify').data
Backbone  = require 'backbone'
Icon      = require './icon.coffee'

module.exports = class Partner extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/partner"

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

  locations: ->
    return @get('locations') if @has('locations')
    locations = new Backbone.Collection([], { model: Backbone.Model })
    locations.url = "#{@url()}/locations"
    @set 'locations', locations
    locations

  alphaSortKey: ->
    @get('sortable_id')

  href: ->
    "#{sd.ARTSY_URL}/#{@get('default_profile_id')}"

  displayName: ->
    @get('name')
