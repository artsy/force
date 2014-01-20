_           = require 'underscore'
Backbone    = require 'backbone'
Artist      = require '../models/artist.coffee'

module.exports = class Artist extends Backbone.Collection

  model: Artist
