_               = require 'underscore'
Backbone        = require 'backbone'
TestGroup       = require '../models/test_group.coffee'
CurrentUser     = require '../models/current_user.coffee'
{ ARTSY_URL }   = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class TestGroups extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

  url: "#{ARTSY_URL}/api/v1/me/test_groups"

  model: TestGroup
