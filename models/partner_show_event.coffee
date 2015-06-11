_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data

module.exports = class PartnerShowEvent extends Backbone.Model

  eventType: ->
    if @get('event_type') is 'Other' then 'Event' else @get('event_type')

  runningDates: ->
    formattedStartTime = moment.utc(@get('start_at')).format("h:mma").replace(":00", "")
    formattedEndTime = moment.utc(@get('end_at')).format("h:mma").replace(":00", "")
    if moment.utc(@get('start_at')).dayOfYear() is moment.utc(@get('end_at')).dayOfYear()
      "#{moment.utc(@get('start_at')).format("MMMM Do")}, #{formattedStartTime} - #{formattedEndTime}"
    else
      "#{moment.utc(@get('start_at')).format("MMMM Do")}, #{formattedStartTime} -
      #{moment.utc(@get('end_at')).format("MMMM Do")}, #{formattedEndTime}"
