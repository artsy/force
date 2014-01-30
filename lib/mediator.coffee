_         = require 'underscore'
Backbone  = require 'backbone'

module.exports = window.__mediator ?= _.extend {}, Backbone.Events