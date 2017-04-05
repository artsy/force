module.exports =
  related: ->
    return @__related__ if @__related__?

    PartnerLocations = require '../../../collections/partner_locations'
    Shows = require '../../../collections/partner_shows'
    Profile = require '../../../models/profile'

    locations = new PartnerLocations
    locations.url = "#{@url()}/locations?size=20"

    shows = new Shows [], partnerId: @id
    shows.url = "#{@url()}/shows?sort=-featured,-end_at"

    profile = new Profile id: @get('default_profile_id')

    @__related__ =
      locations: locations
      shows: shows
      profile: profile
