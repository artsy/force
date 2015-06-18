_ = require 'underscore'
{ CURRENT_USER, HIDE_HEADER } = require('sharify').data
{ isTouchDevice } = require '../util/device.coffee'
Dismisser = require '../has_seen/dismisser.coffee'

dismisser = $banner = $body = $window = null

shouldRemove = ->
  CURRENT_USER or
  isTouchDevice() or
  $window.scrollTop() > $banner.height()

removeBanner = ->
  dismisser.dismiss()
  $body.addClass 'body-header-fixed'
  $window
    .off '.welcome-banner'
    # Scroll up to offset the removal of the banner
    .scrollTop $window.scrollTop() - $banner.outerHeight()

maybeRemove = ->
  removeBanner() if shouldRemove()

module.exports = ->
  dismisser = new Dismisser name: 'hide-force-header', limit: 1

  # Previously dismissed?
  # (No need to call `dismisser.dismissed` since the cookie gets
  # set propagated to the `HIDE_HEADER` flag)
  return if HIDE_HEADER

  # Banner is around to dismiss?
  $banner = $('#main-layout-welcome-header')
  return unless $banner.length and $banner.is ':visible'

  $window = $(window)
  $body = $('body')

  $window.on 'scroll.welcome-banner', _.throttle maybeRemove, 50
  maybeRemove()
