_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class State extends Backbone.Model
  defaults: mode: 'grid', sort: 'default'

  isActive: ({ mode, sort } = {}) ->
    @get('mode') is mode and
    @get('sort') is sort
