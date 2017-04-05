_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'

module.exports = class Genes extends Backbone.Collection

  initialize: ->
    @model = require '../models/gene'
