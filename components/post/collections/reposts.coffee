_           = require 'underscore'
Backbone    = require 'backbone'
Repost      = require '../models/repost.coffee'

module.exports = class Reposts extends Backbone.Collection

  model: Repost
