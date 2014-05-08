_               = require 'underscore'
Backbone        = require 'backbone'
Artist          = require '../models/artist.coffee'
{ API_URL }   = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Artists extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)

  model: Artist
