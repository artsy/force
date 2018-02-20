Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class UserFairAction extends Backbone.Model
  urlRoot: "#{API_URL}/api/v1/me/user_fair_action"

  defaults:
    action: 'Attendee'
