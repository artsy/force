moment = require 'moment'
Dismisser = require '../has_seen/dismisser.coffee'
blacklist = require './blacklist.coffee'
AuctionReminders = require './auction_reminders.coffee'
AuctionReminderView = require './view.coffee'

attach = (view) ->
  $el = view.render().$el

  unless ($container = $('.auction-reminders')).length
    $container = $('<div class="auction-reminders"></div>')

  $('body').prepend $container.prepend($el)

  view.once 'closed', ->
    $container.remove() unless $container.children().length

module.exports = ->
  blacklisted = blacklist.check()
  return if blacklisted

  reminders = new AuctionReminders
  reminders.fetch success: ->

    reminders.map (auction) ->
      name = "reminder_#{auction.id}"
      secondsLeft = auction.date('end_at').diff moment(), 'seconds'

      dismisser = new Dismisser
        limit: 1
        name: name
        # Expire any auction reminders when the auction is closed
        expires: secondsLeft

      return if dismisser.dismissed()

      attach new AuctionReminderView
        model: auction
        dismisser: dismisser
