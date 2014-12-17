_ = require 'underscore'
Backbone = require 'backbone'
InstallShot = require '../models/install_shot.coffee'
Parallel = require '../models/mixins/parallel.coffee'

module.exports = class InstallShots extends Backbone.Collection
  _.extend @prototype, Parallel

  model: InstallShot
