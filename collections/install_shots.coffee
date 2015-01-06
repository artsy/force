_ = require 'underscore'
Backbone = require 'backbone'
InstallShot = require '../models/install_shot.coffee'
{ Fetch } = require 'artsy-backbone-mixins'
{ API_URL } = require('sharify').data

module.exports = class InstallShots extends Backbone.Collection
  _.extend @prototype, Fetch(API_URL)

  model: InstallShot
