moment = require 'moment'
Q = require 'bluebird-q'
_ = require 'underscore'
mediator = require '../../lib/mediator.coffee'
Dismisser = require '../has_seen/dismisser.coffee'
blacklist = require './blacklist.coffee'
AuctionReminders = require './auction_reminders.coffee'
AuctionReminderView = require './view.coffee'
MyBidderPositions = require '../../collections/bidder_positions.coffee'
CurrentUser = require '../../models/current_user.coffee'

# Attach the view to the dom and unhide it
# @return {Q.Promise} that resolves after calculating offset time (for reminder time display)
attach = (view) ->
  view.preRender()
  .then (view) ->
    $el = view.$el
    unless ($container = $('.auction-reminders')).length
      $container = $('<div class="auction-reminders"></div>')
    $('body').prepend $container.prepend($el)
    view.once 'closed', ->
      $container.remove() unless $container.children().length
    _.defer () -> view.unhide()
    view

# @return {function} to filter based on user's registrations
isRegistered = (registrations) ->
  (auction) ->
    return true unless auction.isRegistrationEnded()
    registrations.filter (r) -> r.get('sale')?.id == auction.get('id')
      .length > 0


# Get the end time(utc) for the auction to display if it matters for that auction (it doesn't for live_open)
# @param {Sale} auction
# @return {Moment} time object I think... #date calls moment.utc @get(attr)
endTime = (auction) -> switch auction.reminderStatus()
  when 'closing_soon' then auction.date 'end_at'
  when 'live_open_soon' then auction.date 'live_start_at'
  else auction.date 'end_at'


# Build reminder view and it to dom unless it should be dismissed
# @param {Sale} auction
# @return {Q.Promise[AuctionReminderView]} + dismisser
attachReminder = (auction) ->
  Q.fcall () ->
    name = "reminder_#{auction.id}"
    end = endTime(auction)
    secondsLeft = end?.diff moment(), 'seconds'
    return if end.isBefore()
    view = new AuctionReminderView
      model: auction
      dismisser: new Dismisser
        limit: 1
        name: name
        # Expire any auction reminders when the auction is closed
        expires: secondsLeft
    if view.dismisser.dismissed() then view else attach view

module.exports = ->
  user = CurrentUser.orNull()
  blacklisted = blacklist.check()
  return if blacklisted

  reminders = new AuctionReminders
  reminders.fetch success: ->
    if user
      user.fetchRegistrations success: (registrations) ->
        viewPromises = reminders
          .filter(isRegistered(registrations))
          .map(attachReminder)
        Q.all(viewPromises)
        .then (reminderViews) ->
          [dismissed, shown] = _.partition(reminderViews, (a) -> a.dismisser.dismissed() )
          mediator.trigger 'auction-reminders:none' if reminderViews.length is dismissed.length
    else
      viewPromises = reminders
        .filter (r) -> !r.isRegistrationEnded()
        .map(attachReminder)
      Q.all(viewPromises)
      .then (reminderViews) ->
        [dismissed, shown] = _.partition(reminderViews, (a) -> a.dismisser.dismissed() )
        mediator.trigger 'auction-reminders:none' if reminderViews.length is dismissed.length
