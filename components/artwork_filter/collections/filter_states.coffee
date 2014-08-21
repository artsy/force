_ = require 'underscore'
Backbone = require 'backbone'
FilterState = require '../models/filter_state.coffee'

module.exports = class FilterStates extends Backbone.Collection
  model: FilterState
