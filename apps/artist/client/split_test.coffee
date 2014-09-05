_ = require 'underscore'
Cookies = require 'cookies-js'
{ splitTest, setProperty, unsetProperty } = require '../../../lib/analytics.coffee'
CurrentUser = require '../../../models/current_user.coffee'

splitTestKey = 'artist-page-interface'
variations =
  fillwidth: 1/3
  filter: 1/3
  filter_carousel: 1/3

adminDefault = ->
  'filter_carousel' if CurrentUser.orNull()?.isAdmin()

setInterface = (variation) ->
  return unless _.contains _.keys(variations), variation
  Cookies.set splitTestKey, variation
  setProperty _.tap({}, (hsh) -> hsh[splitTestKey] = variation)
  variation

module.exports = ->
  window.currentInterface = currentInterface =
    Cookies.get(splitTestKey) or
    adminDefault() or
    splitTest(splitTestKey, variations) or
    'fillwidth'
  setInterface currentInterface

window.changeInterface = (variation) ->
  setInterface variation
  location.reload()

window.clearInterface = ->
  Cookies.expire splitTestKey
  unsetProperty splitTestKey
  location.reload()
