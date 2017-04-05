Backbone = require 'backbone'
{ API_URL } = require('sharify').data
UserFairAction = require '../models/user_fair_action'

module.exports = class UserFairActions extends Backbone.Collection
  model: UserFairAction

  url: "#{API_URL}/api/v1/me/user_fair_actions"

  attendFair: (fair) ->
    @add
      action: 'Attendee'
      fair_id: fair.id

  isAttending: (fair) ->
    @findWhere(fair_id: fair.id)?
