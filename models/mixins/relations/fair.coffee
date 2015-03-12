module.exports =
  related: ->
    return @__related__ if @__related__?

    Profile = require '../../../models/profile.coffee'

    profile_id = @get('default_profile_id') || @get('organizer')?.profile_id

    profile = new Profile id: profile_id

    @__related__ =
      profile: profile
