_ = require 'underscore'
Backbone = require 'backbone'
Profile  = require '../models/profile.coffee'

module.exports = class Profiles extends Backbone.Collection

  model: Profile
