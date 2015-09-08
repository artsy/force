Backbone = require 'backbone'
{ API_URL } = require('sharify').data

module.exports = class CurrentUserFairAction extends Backbone.Model
  url: "#{API_URL}/api/v1/me/user_fair_action"

  defaults:
    action: 'Attendee'
