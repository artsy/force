Backbone = require 'backbone'

module.exports = class EditionSets extends Backbone.Collection

  initialize: ->
    @model = require '../models/edition_set'
