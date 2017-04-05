_ = require 'underscore'
{ toSentence } = require 'underscore.string'
Backbone = require 'backbone'
Artist = require '../models/artist'
{ API_URL } = require('sharify').data
{ Fetch, AToZ } = require 'artsy-backbone-mixins'

module.exports = class Artists extends Backbone.Collection
  _.extend @prototype, AToZ
  _.extend @prototype, Fetch(API_URL)

  model: Artist

  comparator: 'sortable_id'

  toSentence: ->
    toSentence @map (model) -> model.get('name')

