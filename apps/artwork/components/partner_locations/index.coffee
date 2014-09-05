_ = require 'underscore'
_s = require 'underscore.string'
Partner = require '../../../../models/partner.coffee'
PartnerPhoneNumberView = require '../partner_phone_number/view.coffee'

# Sets up the partner phone numbers while simultaneously rendering
# partner locations, since they are relying on the same data
module.exports = class PartnerLocations
  constructor: (options = {}) ->
    { @$el, @artwork } = options
    return unless @artwork.has 'partner'
    @partner = new Partner(@artwork.get 'partner')
    @locations = @partner.locations()
    @locations.fetchUntilEnd success: =>
      @renderLocations @locations
      @setupPhoneNumbers @locations

  renderLocations: (locations) ->
    if locations.length
      locationString = if locations.length > limit = 3
        "#{locations.length} Locations"
      else
        @renderFirstCities locations, limit
      @$el.find('#artwork-partner-locations')
        .text ", #{locationString}"

  renderFirstCities: (locations, n) ->
    cities = _.take _.uniq(locations.pluck 'city'), n
    _s.toSentence(cities, ', ', ' & ') if cities.length

  setupPhoneNumbers: (locations) ->
    if @artwork.isContactable()
      new PartnerPhoneNumberView
        el: @$el.find('#artwork-partner-phone-container')
        collection: locations
        model: @artwork
