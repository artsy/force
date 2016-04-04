Backbone = require 'backbone'
Module = require '../models/module.coffee'

module.exports = class Modules extends Backbone.Collection
  model: Module
