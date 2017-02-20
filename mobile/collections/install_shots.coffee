_ = require 'underscore'
Backbone = require 'backbone'
InstallShot = require '../models/install_shot.coffee'
{ Fetch } = require 'artsy-backbone-mixins'
{ API_URL } = require('sharify').data

module.exports = class InstallShots extends Backbone.Collection
  _.extend @prototype, Fetch(API_URL)

  model: InstallShot

  parse: (response) ->
    _.filter response, (obj) ->
      # filter out images without versions
      obj.image_versions?.length

  hasCaptions: ->
    _.any _.map(@pluck('caption'), _.negate _.isEmpty)
