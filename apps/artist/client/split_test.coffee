_ = require 'underscore'
{ splitTest } = require '../../../lib/analytics.coffee'
Cookies = require 'cookies-js'
CurrentUser = require '../../../models/current_user.coffee'

splitTestKey = 'artist-page-interface'
variations =
  fillwidth: 1/3
  filter: 1/3
  filter_carousel: 1/3

adminDefault = ->
  'filter_carousel' if CurrentUser.orNull()?.isAdmin()

module.exports = window.currentInterface =
  Cookies.get(splitTestKey) or
  adminDefault() or
  splitTest(splitTestKey, variations) or
  'fillwidth'

window.changeInterface = (variation) ->
  return unless _.contains _.keys(variations), variation
  Cookies.set splitTestKey, variation
  location.reload()

window.clearInterface = ->
  Cookies.expire splitTestKey
  location.reload()
