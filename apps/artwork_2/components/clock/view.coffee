Backbone = require 'backbone'
countdown = require './index.coffee'
template = -> require('./index.jade') arguments...

module.exports = class ClockView extends Backbone.View
  initialize: ({ @label, @timestamp }) -> #

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
