moment = require 'moment'
Backbone = require 'backbone'
countdown = require './index'
template = -> require('./index.jade') arguments...

module.exports = class ClockView extends Backbone.View
  initialize: ({ @label, @timestamp }) ->
    endAt = moment.utc @timestamp

    if endAt.isAfter()
      setTimeout (-> location.reload()), endAt.diff moment.utc()

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
