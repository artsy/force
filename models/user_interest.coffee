_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Relations = require './mixins/relations/user_interest.coffee'

module.exports = class UserInterest extends Backbone.Model
  _.extend @prototype, Relations

  urlRoot: "#{API_URL}/api/v1/me/user_interest"

  defaults:
    category: 'collected_before'
