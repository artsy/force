_ = require 'underscore'
Backbone = require 'backbone'
{ API_URL } = require('sharify').data
Relations = require './mixins/relations/user_interest.coffee'

module.exports = class UserInterest extends Backbone.Model
  _.extend @prototype, Relations

  defaults:
    category: 'collected_before'
