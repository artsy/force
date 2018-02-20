_ = require 'underscore'
sd = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
FairEvent = require '../models/fair_event.coffee'
{ Fetch } = require 'artsy-backbone-mixins'

module.exports = class FairEvents extends Backbone.Collection

  _.extend @prototype, Fetch(sd.API_URL)

  model: FairEvent

  url: -> "#{sd.API_URL}/api/v1/fair/#{@fairId}/fair_events"

  initialize: (models, options) ->
    { @fairId } = options

  groupByDay: ->
    groups = @groupBy (event) ->
      event.groupByDate('start_at')

    sortedGroups = _.each groups, (group, key, list) ->
      list[key] = _.sortBy group, (model)->
        new Date(model.get('start_at')).getTime()

    return sortedGroups

  getEventDays: (days) ->
    eventDays = []
    for day in days
      eventDays.push({
        date: day
        dayAbbr: moment(day).utc().format 'ddd'
        dayNum: moment(day).utc().format 'D'
        href: "##{day}"
      })
    eventDays
