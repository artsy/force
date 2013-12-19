sd              = require('sharify').data
Backbone        = require 'backbone'
CoverImage      = require './icon.coffee'

module.exports = class Partner extends Backbone.Model

  urlRoot: "#{sd.ARTSY_URL}/api/v1/partner"

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

  displayName: ->
  	@get('owner')?.name

  locations: ->
    return @get('locations') if @has('locations')
    locations = new Backbone.Collection([], { model: Backbone.Model })
    locations.url = "#{@url()}/locations"
    @set 'locations', locations
    locations
