moment = require 'moment'
Backbone = require 'backbone'
countdown = require './index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ClockView extends Backbone.View
  initialize: ({ @label, @timestamp }) ->
    endAt = moment.utc(@timestamp)

    if endAt.isAfter()
      # setTimeout fires immediately for any value 2^31 or greater, so prevent
      # that from happening.
      reloadMs = Math.min(endAt.diff(moment.utc()), 0x7FFFFFFF)
      setTimeout ->
        location.reload()
      , reloadMs

  start: ->
    @timer = setInterval @render.bind(this), 1000

  render: ->
    @$el.html template
      label: @label
      countdown: countdown(@timestamp)
    this

  remove: ->
    clearInteval @timer
    super
