sd = require('sharify').data
_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
moment = require 'moment'
DateHelpers = require '../components/util/date_helpers.coffee'

module.exports = class FairEvent extends Backbone.Model

  urlRoot: -> "#{sd.API_URL}/api/v1/fair/#{@fairId}/fair_event"

  initialize: (attributes, options) ->
    { @fairId } = options

  formatDate: ->
    start = moment(Date.parse(@get('start_at')))
    "#{start.format('dddd')}, #{start.format('MMMM')} #{start.format('D')}"

  formatTime: ->
    start = moment(Date.parse(@get('start_at')))
    end = moment(Date.parse(@get('end_at')))
    "#{start.format('h')}:#{start.format('mm')}-#{end.format('h')}:#{end.format('mm')}#{end.format('A')}"