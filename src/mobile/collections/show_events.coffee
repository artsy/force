_ = require 'underscore'
Backbone = require 'backbone'
ShowEvent = require '../models/show_event.coffee'

module.exports = class ShowEvents extends Backbone.Collection

  model: ShowEvent
