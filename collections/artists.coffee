_ = require 'underscore'
Backbone = require 'backbone'
Artist = require '../models/artist.coffee'
{ GRAVITY_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Artists extends Backbone.Collection

  _.extend @prototype, Fetch(GRAVITY_URL)

  model: Artist