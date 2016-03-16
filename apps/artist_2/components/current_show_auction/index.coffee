_ = require 'underscore'

current = (type, artist) ->
  return if not items = artist[type]
  firstItem = _.find items, (item) -> not item.fair
  return if not firstItem
  hasMany = items.length > 1
  imageUrl = firstItem.cover_image.cropped.url
  item = _.pick firstItem, 'start_at', 'end_at', 'name', 'href'
  _.extend item, { hasMany, type, imageUrl }
  item

module.exports = (artist) ->
  type = _.reduce ['auction', 'show'], (memo, type) ->
    memo ?= current(type, artist)
  , undefined

