_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
Icon = require './icon'
PartnerLocations = require '../collections/partner_locations'
Relations = require './mixins/relations/partner'

module.exports = class Partner extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{sd.API_URL}/api/v1/partner"

  @types:
    'Auction': 'Auction House'
    'Demo': 'Demo'
    'Gallery': 'Gallery'
    'Private Collector': 'Private Collector'
    'Private Dealer': 'Gallery'

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

  defaultIconInitials: ->
    iconInitials = ''
    reduceFunction = (result, name) ->
      return result unless name[0] and /\w/.test name[0]
      result + name[0]
    iconInitials = _.reduce(@displayName()?.split(' '), reduceFunction, '')[0..1]
    iconInitials

  displayNameAndLocation: ->
    _.compact([
      @displayName()
      @displayLocations()
    ]).join(', ')

  # @param {String} preferredCity (optional)
  displayLocations: (preferredCity) ->
    @related().locations.displayLocations(preferredCity)

  getMailTo: ->
    return "" unless @has('email') && @get('email').length > 0
    subject = encodeURIComponent "Connecting with #{@get('name')} via Artsy"
    "mailto:#{@get('email')}?subject=#{subject}&cc=inquiries@artsy.net"

  getSimpleWebsite: ->
    return "" unless @has('website') && @get('website').length > 0
    @get('website').replace('http://', '').replace(/\/$/g, '')

  typeName: ->
    if @get('type') is 'Gallery' then 'Gallery' else 'Institution'

  claimed: -> @get('claimed')
