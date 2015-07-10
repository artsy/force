module.exports =
  related: ->
    return @__related__ if @__related__?

    CollectorProfile = require '../../collector_profile.coffee'

    collectorProfile = new CollectorProfile({ anonymous_session_id: @id } unless @isLoggedIn())

    @__related__ =
      collectorProfile: collectorProfile
