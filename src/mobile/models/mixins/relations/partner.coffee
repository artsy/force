module.exports =
  related: ->
    return @__related__ if @__related__?

    Locations = require '../../../collections/partner_locations'
    Shows = require '../../../collections/partner_shows'

    locations = new Locations [], partnerId: @id
    shows = new Shows [], partnerId: @id

    @__related__ =
      locations: locations
      shows: shows
