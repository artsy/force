_ = require 'underscore'
Backbone = require 'backbone'
Repost = require '../models/repost.coffee'
sd = require('sharify').data

module.exports = class Reposts extends Backbone.Collection

  url: -> "#{sd.API_URL}/api/v1/reposts"

  model: Repost
