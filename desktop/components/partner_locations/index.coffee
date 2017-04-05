_ = require 'underscore'
_s = require 'underscore.string'
Partner = require '../../models/partner'
PartnerPhoneNumberView = require '../partner_phone_number/view'

# Sets up the partner phone numbers while simultaneously rendering
# partner locations, since they are relying on the same data
module.exports = class PartnerLocations
  constructor: ({ @$el, @artwork }) ->
    return unless @artwork.has 'partner'

    @partner = @artwork.related().partner
    @locations = @partner.related().locations

    @locations.fetch success: =>
      @renderLocations @locations
      @setupPhoneNumbers @locations

  renderLocations: (locations) ->
    if locations.length
      locationString = if locations.length > limit = 3
        "#{locations.length} Locations"
      else
        @renderFirstCities locations, limit
      if window.location.href.match('/artwork')
        text = "#{locationString}"
      else
        text = ", #{locationString}"
      @$el.find('.artwork-partner-locations')
        .text text

  renderFirstCities: (locations, n) ->
    cities = _.take _.uniq(locations.pluck 'city'), n
    _s.toSentence(cities, ', ', ' & ') if cities.length

  setupPhoneNumbers: (locations) ->
    if @artwork.isContactable() and
      @$el.find('.artwork-partner-phone-container').length and
      not @artwork.isPartOfAuctionPromo()
        new PartnerPhoneNumberView
          el: @$el.find('.artwork-partner-phone-container')
          collection: locations
          model: @artwork
