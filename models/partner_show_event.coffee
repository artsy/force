_ = require 'underscore'
Backbone = require 'backbone'
moment = require 'moment'
sd = require('sharify').data

module.exports = class PartnerShowEvent extends Backbone.Model

  formatEvent: ->
      title = if @get('event_type') is "Other" then @get('title') else @get('event_type')
      formattedStart = moment.utc(@get('start_at')).format("h:mma").replace(":00", "")
      formattedEnd = moment.utc(@get('end_at')).format("h:mma").replace(":00", "")
      if moment.utc(@get('start_at')).dayOfYear() is moment.utc(@get('end_at')).dayOfYear()
        title + ": " + moment.utc(@get('start_at')).format("MMMM D") + ", " + formattedStart + " - " + formattedEnd
      else
        title + ": " + "#{moment.utc(@get('start_at')).format("MMMM D")}, #{formattedStart} -
                        #{moment.utc(@get('end_at')).format("MMMM D")}, #{formattedEnd}"
