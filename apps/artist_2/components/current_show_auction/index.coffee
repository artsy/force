_ = require 'underscore'

current = (type, artist) ->
  currentItems = artist[type]
  count = currentItems.length
  item = currentItems[0]
  console.log item
  _.extend(_.pick(item, 'location', 'start_at', 'end_at', 'name', 'href', 'exhibition_period'), {
    type: type
    hasMany: count > 1
    imageUrl: item.cover_image?.cropped.url
    secondaryName: item.partner?.name
  })

module.exports = (artist) ->
  console.log artist
  type = _.find ['auction', 'show'], (type) ->
    artist[type]?.length > 0
  console.log type
  result = current(type, artist) if type
  result