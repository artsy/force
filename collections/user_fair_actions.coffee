Backbone = require 'backbone'
{ API_URL } = require('sharify').data
UserFairAction = require '../models/user_fair_action.coffee'

module.exports = class UserFairActions extends Backbone.Collection
  model: UserFairAction

  url: "#{API_URL}/api/v1/user_fair_actions"

  attendFair: (fair) ->
    @add
      action: 'Attendee'
      name: fair.nameSansYear()
      fair_id: fair.id
