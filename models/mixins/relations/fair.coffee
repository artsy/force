module.exports =
  related: ->
    return @__related__ if @__related__?

    Profile = require '../../../models/profile.coffee'

    profile = new Profile id: @get('organizer')?.profile_id

    @__related__ =
      profile: profile
