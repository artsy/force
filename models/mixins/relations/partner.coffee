module.exports =
  related: ->
    return @__related__ if @__related__?

    PartnerLocations = require '../../../collections/partner_locations.coffee'
    Shows = require '../../../collections/partner_shows.coffee'

    locations = new PartnerLocations
    locations.url = "#{@url()}/locations?size=20"

    shows = new Shows [], partnerId: @id
    shows.url = "#{@url()}/shows?sort=-featured,-end_at"

    @__related__ =
      locations: locations
      shows: shows