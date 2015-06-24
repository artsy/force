Backbone = require 'backbone'

module.exports = class Done extends Backbone.View
  initialize: ({ @state }) ->
    @state.trigger 'done'
