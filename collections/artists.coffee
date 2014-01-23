_               = require 'underscore'
Backbone        = require 'backbone'
Artist          = require '../models/artist.coffee'
fetchUntilEnd   = require './mixins/fetch_until_end.coffee'

module.exports = class Artists extends Backbone.Collection
  _.extend @prototype, fetchUntilEnd

  model: Artist
