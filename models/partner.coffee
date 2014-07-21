_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Icon = require './icon.coffee'

module.exports = class Partner extends Backbone.Model

  urlRoot: "#{sd.API_URL}/api/v1/partner"

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

  locations: ->
    return @get('locations') if @has('locations')
    locations = new Backbone.Collection([], { model: Backbone.Model })
    locations.url = "#{@url()}/locations"
    @set 'locations', locations
    locations

  isLinkable: -> @get('default_profile_id') and @get('default_profile_public')

  alphaSortKey: ->
    @get('sortable_id')

  href: ->
    "/#{@get('default_profile_id')}"

  displayName: ->
    @get('name')

  displayNameAndLocation: ->
    _.compact([
      @displayName()
      @displayLocations()
    ]).join(', ')

  # @param {String} preferredLocation (optional)
  displayLocations: (preferredLocation) ->
    if @get('locations')?.length
      string =
        @get('locations').findWhere(city: preferredLocation)?.get('city') or
        @get('locations').first().get('city') or
        @get('locations').first().get('country')

      if @get('locations').length > 1
        string += " + #{@get('locations').length - 1} other location"
        string += "s" unless @get('locations').length is 2

      string

  getMailTo: ->
    return "" unless @has('email') && @get('email').length > 0
    subject = encodeURIComponent "Connecting with #{@get('name')} via Artsy"
    "mailto:#{@get('email')}?subject=#{subject}&cc=inquiries@artsy.net"

  getSimpleWebsite: ->
    return "" unless @has('website') && @get('website').length > 0
    @get('website').replace('http://', '').replace(/\/$/g, '')

  typeName: ->
    if @get('type') is 'Gallery' then 'Gallery' else 'Institution'
