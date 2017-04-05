_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap'
moment = require 'moment'
Backbone = require 'backbone'
sd = require('sharify').data

module.exports.ProgrammingView = class ProgrammingView extends Backbone.View

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
    @$('.fair-programming-active').removeClass 'fair-programming-active'
    @$(".fair-programming-nav-item[data-day='#{day}'], .fair-programming-events-for-day[data-day='#{day}']").addClass 'fair-programming-active'

  events:
    'click .fair-programming-nav-item': 'onNavItemClick'

  onNavItemClick: (event) ->
    $target = $(event.target).closest 'a'
    @setDay $target.attr('data-day')
    false

module.exports.init = ->
  bootstrap()
  return if window.location.href.indexOf('event') >= 0
  new ProgrammingView
    el: $ '.fair-programming-event-list'
    dates: sd.DATES
    day: sd.DAY || null
