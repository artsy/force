_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
FairEvent = require '../models/fair_event.coffee'
{ API_URL } = require('sharify').data
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class Fairs extends Backbone.Collection

  _.extend @prototype, Fetch(API_URL)

  model: FairEvent

  # url: "#{sd.API_URL}/api/v1/fair/#{@fairId}/fair_events"