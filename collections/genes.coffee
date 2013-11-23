Backbone = require 'backbone'

module.exports = class Genes extends Backbone.Collection

  initialize: ->
    @model = require '../models/gene.coffee'