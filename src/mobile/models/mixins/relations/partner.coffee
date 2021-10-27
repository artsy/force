module.exports =
  related: ->
    return @__related__ if @__related__?

    { PartnerLocations } = require '../../../collections/partner_locations'
    { PartnerShows } = require '../../../collections/partner_shows'

    locations = new PartnerLocations [], partnerId: @id
    shows = new PartnerShows [], partnerId: @id

    @__related__ =
      locations: locations
      shows: shows
