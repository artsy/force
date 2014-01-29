_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../models/artist.coffee'
{ ARTSY_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Artists extends Backbone.Collection

  _.extend @prototype, Fetch(ARTSY_URL)

  model: Artist
