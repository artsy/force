_ = require 'underscore'
Backbone = require 'backbone'
DesktopUser = require '../desktop/models/current_user.coffee'
MobileUser = require '../mobile/models/current_user.coffee'

module.exports = class MergedUser extends Backbone.Model

  _.extend @prototype, DesktopUser.prototype
  _.extend @prototype, MobileUser.prototype
