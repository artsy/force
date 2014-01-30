_         = require 'underscore'
Backbone  = require 'backbone'

module.exports = if window?.__mediator? then window?.__mediator else _.extend {}, Backbone.Events