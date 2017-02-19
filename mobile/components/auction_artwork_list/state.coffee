Backbone = require 'backbone'

module.exports = class State extends Backbone.Model
  sort: 'default'

  isActive: ({ sort } = {}) ->
    @get('sort') is sort
