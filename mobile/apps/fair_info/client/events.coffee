_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap'
moment = require 'moment'
Backbone = require 'backbone'
sd = require('sharify').data

module.exports.EventsView = class EventsView extends Backbone.View

  initialize: (options) ->
    { @dates, @day } = options
    unless @dates
      throw "This view requires an array of dates"
      return
    # Default to today if in the range, else take the first day
    today = moment().format('YYYY-MM-DD')
    today = @dates[0] unless _.contains @dates, today
    @setDay today

  setDay: (day) ->
    @$('.is-active').removeClass 'is-active'
    @$(".fair-info-event-nav-item[data-day='#{day}'], .fair-info-events-for-day[data-day='#{day}']").addClass 'is-active'

  events:
    'click .fair-info-event-nav-item': 'onNavItemClick'

  onNavItemClick: (event) ->
    $target = $(event.target).closest 'a'
    @setDay $target.attr('data-day')
    false

module.exports.init = ->
  bootstrap()
  return if window.location.href.indexOf('events/') >= 0
  new EventsView
    el: $ '.fair-info-event-list'
    dates: sd.DATES
    day: sd.DAY || null
