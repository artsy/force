Backbone = require 'backbone'
_ = require 'underscore'
Artist = require '../models/artist.coffee'

module.exports = class Artist extends Backbone.Collection

  model: Artist
