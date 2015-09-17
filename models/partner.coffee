_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Icon = require './icon.coffee'
PartnerLocations = require '../collections/partner_locations.coffee'
Relations = require './mixins/relations/partner.coffee'

module.exports = class Partner extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{sd.API_URL}/api/v1/partner"

  @types:
    'Auction': 'Auction House'
    'Demo': 'Demo'
    'Gallery': 'Gallery'
    'Museum': 'Museum'
    'Artist Estate': 'Artist Estate'
    'Private Collection': 'Private Collection'
    'Private Collector': 'Private Collector'
    'Private Dealer': 'Gallery'
    'Foundation': 'Foundation'
    'Public Domain': 'Public Domain'
    'Image Archive': 'Image Archive'
    'Non Profit': 'Non-Profit'

  displayType: ->
    @constructor.types[@get 'type'] or 'Gallery'

  icon: ->
    new Icon @get('icon'), profileId: @get('id')

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
    @related().locations.displayLocations(preferredLocation)

  getMailTo: ->
    return "" unless @has('email') && @get('email').length > 0
    subject = encodeURIComponent "Connecting with #{@get('name')} via Artsy"
    "mailto:#{@get('email')}?subject=#{subject}&cc=inquiries@artsy.net"

  getSimpleWebsite: ->
    return "" unless @has('website') && @get('website').length > 0
    @get('website').replace('http://', '').replace(/\/$/g, '')

  typeName: ->
    if @get('type') is 'Gallery' then 'Gallery' else 'Institution'
