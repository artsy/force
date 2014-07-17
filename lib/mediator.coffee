_ = require 'underscore'
Backbone = require 'backbone'

mediator = _.extend({}, Backbone.Events)
module.exports = (window?.__mediator ?= mediator) or mediator
