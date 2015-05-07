module.exports =
  related: ->
    return @__related__ if @__related__?

    PartnerLocations = require '../../../collections/partner_locations.coffee'

    locations = new PartnerLocations
    locations.url = "#{@url()}/locations"

    @__related__ =
      locations: locations
