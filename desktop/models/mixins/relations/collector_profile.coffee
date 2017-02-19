module.exports =
  related: ->
    return @__related__ if @__related__?

    UserInterests = require '../../../collections/user_interests.coffee'
    UserFairActions = require '../../../collections/user_fair_actions.coffee'

    userInterests = new UserInterests
    userFairActions = new UserFairActions

    @__related__ =
      userInterests: userInterests
      userFairActions: userFairActions
