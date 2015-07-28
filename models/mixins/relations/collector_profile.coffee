module.exports =
  related: ->
    return @__related__ if @__related__?

    UserInterests = require '../../../collections/user_interests.coffee'

    userInterests = new UserInterests [], collectorProfile: this

    @__related__ =
      userInterests: userInterests
