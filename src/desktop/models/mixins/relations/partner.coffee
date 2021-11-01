module.exports =
  related: ->
    return @__related__ if @__related__?

    { PartnerLocations } = require '../../../collections/partner_locations'
    { PartnerShows } = require '../../../collections/partner_shows'
    Profile = require '../../../models/profile.coffee'

    locations = new PartnerLocations
    locations.url = "#{@url()}/locations?size=20"

    shows = new PartnerShows [], partnerId: @id
    shows.url = "#{@url()}/shows?sort=-featured,-end_at"

    profile = new Profile id: @get('default_profile_id')

    @__related__ =
      locations: locations
      shows: shows
      profile: profile
