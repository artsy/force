_ = require 'underscore'
{ toSentence } = require 'underscore.string'
sd = require('sharify').data
Backbone = require 'backbone'
{ AToZ, Fetch } = require 'artsy-backbone-mixins'

module.exports = class Artists extends Backbone.Collection

  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(sd.API_URL)

  initialize: ->
    @model = require '../models/artist'

  toSentence: ->
    toSentence @pluck('name')
