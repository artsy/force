_         = require 'underscore'
Backbone  = require 'backbone'
Artist    = require '../models/artist.coffee'
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Artists extends Backbone.Collection

  _.extend @prototype, Fetch

  model: Artist
